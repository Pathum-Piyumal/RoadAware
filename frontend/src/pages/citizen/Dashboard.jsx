import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Activity, Filter, Plus, Clock, Wrench, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import HazardService from '../../services/hazard.service';
import toast from 'react-hot-toast';

// Dummy Data Fallback
const DUMMY_HAZARDS = [
  {
    id: '1',
    type: 'Pothole',
    location: '102 Main Road, Colombo',
    description: 'Deep pothole in the middle lane causing traffic disruption.',
    currentStatus: 'Pending',
    createdAt: '2026-05-12T08:30:00Z',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400',
    timeline: [
      { status: 'Pending', timestamp: '2026-05-12T08:30:00Z', note: 'Report submitted successfully.' }
    ]
  },
  {
    id: '2',
    type: 'Streetlight',
    location: 'Park Avenue, Kandy',
    description: 'Streetlight has been out for 3 days, making the crossing dangerous.',
    currentStatus: 'In Progress',
    createdAt: '2026-05-10T19:15:00Z',
    image: null,
    timeline: [
      { status: 'Pending', timestamp: '2026-05-10T19:15:00Z', note: 'Report submitted successfully.' },
      { status: 'In Progress', timestamp: '2026-05-11T09:00:00Z', note: 'Assigned to maintenance crew.' }
    ]
  },
  {
    id: '3',
    type: 'Flooding',
    location: 'River Road, Galle',
    description: 'Severe water logging after recent rain. Drains seem blocked.',
    currentStatus: 'Resolved',
    createdAt: '2026-05-01T14:20:00Z',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993bbf7?auto=format&fit=crop&q=80&w=400',
    timeline: [
      { status: 'Pending', timestamp: '2026-05-01T14:20:00Z', note: 'Report submitted successfully.' },
      { status: 'In Progress', timestamp: '2026-05-02T10:30:00Z', note: 'Crew dispatched to clear drains.' },
      { status: 'Resolved', timestamp: '2026-05-02T16:45:00Z', note: 'Drains cleared. Water level receded.' }
    ]
  }
];

const Dashboard = () => {
  const [hazards, setHazards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchHazards = async () => {
      try {
        // Attempt to fetch from API
        const data = await HazardService.getMyHazards();
        setHazards(data);
      } catch (error) {
        // Fallback to dummy data for demonstration
        console.warn('API unavailable, using dummy data.');
        setHazards(DUMMY_HAZARDS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHazards();
  }, []);

  const filteredHazards = filter === 'All' 
    ? hazards 
    : hazards.filter(h => h.currentStatus === filter);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getTimelineIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock size={16} className="text-orange-500" />;
      case 'in progress': return <Wrench size={16} className="text-blue-500" />;
      case 'resolved': return <CheckCircle2 size={16} className="text-green-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Reports</h1>
            <p className="text-gray-500 mt-1 font-medium">Track the status of road hazards you've reported.</p>
          </div>
          <Link 
            to="/report-hazard" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-black transition-colors"
          >
            <Plus size={20} />
            New Report
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex overflow-x-auto mb-8 gap-2">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                filter === status 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Hazard Cards List */}
        <div className="space-y-6">
          {filteredHazards.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                You haven't submitted any reports with the status '{filter}'.
              </p>
            </div>
          ) : (
            filteredHazards.map((hazard) => (
              <div key={hazard.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col lg:flex-row gap-8 transition-all hover:shadow-2xl hover:shadow-gray-200/50">
                
                {/* Left side: Info & Image */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <StatusBadge status={hazard.currentStatus} />
                      <h2 className="text-xl font-bold text-gray-900 mt-3">{hazard.type}</h2>
                    </div>
                    {hazard.image ? (
                      <img src={hazard.image} alt={hazard.type} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl shadow-sm" />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-xs font-medium border border-gray-200 border-dashed">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                    {hazard.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center text-sm font-semibold text-gray-600">
                      <MapPin size={16} className="mr-1.5 text-gray-400" />
                      {hazard.location}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-gray-600">
                      <Calendar size={16} className="mr-1.5 text-gray-400" />
                      {formatDate(hazard.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Right side: Timeline */}
                <div className="lg:w-80 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">Status Timeline</h3>
                  <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                    {hazard.timeline.map((event, idx) => {
                      const isLast = idx === hazard.timeline.length - 1;
                      return (
                        <div key={idx} className="relative pl-6">
                          {/* Timeline dot */}
                          <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center
                            ${isLast ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-gray-300'}
                          `}>
                            {isLast && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-sm font-bold ${isLast ? 'text-gray-900' : 'text-gray-500'}`}>
                              {event.status}
                            </span>
                            <span className="text-xs font-semibold text-gray-400">{formatDate(event.timestamp)}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{event.note}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
