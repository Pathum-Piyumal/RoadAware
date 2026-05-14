import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { ArrowLeft, MapPin, Calendar, User, Share2, Loader2, AlertTriangle } from 'lucide-react';

import HazardService from '../../services/hazard.service';
import StatusBadge from '../../components/ui/StatusBadge';
import UpvoteButton from '../../components/hazard-report/UpvoteButton';
import CommentsSection from '../../components/hazard-report/CommentsSection';

// Fix for default Leaflet icon in React
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const HazardDetails = () => {
  const { id } = useParams();
  const [hazard, setHazard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy hazard data fallback
  const DUMMY_HAZARD = {
    id: id,
    type: 'Pothole',
    location: '102 Main Road, Colombo',
    coordinates: [6.9271, 79.8612],
    description: 'There is a massive pothole in the middle lane just past the intersection. It is deep enough to cause serious tire damage. I saw two cars pull over with flat tires while I was walking by.',
    currentStatus: 'Pending',
    createdAt: '2026-05-12T08:30:00Z',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1200',
    upvotes: 142,
    hasUpvoted: false,
    reporter: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=john'
    }
  };

  useEffect(() => {
    const fetchHazard = async () => {
      try {
        // Attempt to fetch real data
        // const data = await HazardService.getHazardById(id);
        // setHazard(data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setHazard(DUMMY_HAZARD);
      } catch (error) {
        console.warn('API unavailable, loading dummy data.');
        setHazard(DUMMY_HAZARD);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHazard();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-600 h-12 w-12" />
      </div>
    );
  }

  if (!hazard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <AlertTriangle size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Hazard Not Found</h2>
        <p className="text-gray-500 mb-6">The report you are looking for does not exist.</p>
        <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Banner & Image */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-gray-900">
        {hazard.image ? (
          <img src={hazard.image} alt={hazard.type} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <AlertTriangle size={64} className="text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        {/* Nav Bar overlaid */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center max-w-5xl mx-auto w-full z-10">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/90 hover:text-white bg-black/30 px-4 py-2 rounded-xl backdrop-blur-md transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-semibold text-sm">Back</span>
          </button>
          
          <button className="p-2 text-white/90 hover:text-white bg-black/30 rounded-xl backdrop-blur-md transition-colors">
            <Share2 size={20} />
          </button>
        </div>

        {/* Title Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto w-full z-10">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={hazard.currentStatus} />
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {hazard.type}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
            {hazard.type} Reported
          </h1>
          <p className="text-lg text-gray-300 flex items-center gap-2 font-medium">
            <MapPin size={18} />
            {hazard.location}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Details, Map, Comments) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
                
                {/* Reporter Info */}
                <div className="flex items-center gap-4">
                  <img src={hazard.reporter.avatar} alt="Reporter" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Reported by</p>
                    <p className="font-bold text-gray-900">{hazard.reporter.name}</p>
                  </div>
                </div>

                {/* Upvote Module */}
                <UpvoteButton 
                  hazardId={hazard.id} 
                  initialUpvotes={hazard.upvotes} 
                  initialHasUpvoted={hazard.hasUpvoted} 
                />
              </div>

              <div className="mb-6 flex items-center gap-3 text-sm text-gray-500 font-medium bg-gray-50 inline-flex px-4 py-2 rounded-xl">
                <Calendar size={16} />
                {formatDate(hazard.createdAt)}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {hazard.description}
              </p>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Exact Location
              </h3>
              <div className="h-[300px] rounded-2xl overflow-hidden border border-gray-200">
                <MapContainer 
                  center={hazard.coordinates} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={hazard.coordinates}>
                    <Popup>{hazard.location}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Comments Section */}
            <CommentsSection hazardId={hazard.id} />

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            
            {/* Call to Action Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-500/20">
              <h3 className="text-2xl font-black mb-2">Help prioritize this fix!</h3>
              <p className="text-orange-100 mb-6 font-medium">
                Local authorities prioritize hazards with high community visibility. Upvote this report if you've seen it too.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
                className="w-full py-3 bg-white text-red-600 font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Go to Upvote
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">What happens next?</h4>
              <ul className="space-y-4 text-sm text-gray-600 relative border-l-2 border-gray-100 ml-2">
                <li className="pl-4 relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full absolute -left-[7px] top-1"></div>
                  <strong className="text-gray-900 block">Report Submitted</strong>
                  Gathering community verification via upvotes.
                </li>
                <li className="pl-4 relative">
                  <div className="w-3 h-3 bg-gray-200 rounded-full absolute -left-[7px] top-1"></div>
                  <strong className="text-gray-900 block">Authority Review</strong>
                  Local council reviews the report.
                </li>
                <li className="pl-4 relative">
                  <div className="w-3 h-3 bg-gray-200 rounded-full absolute -left-[7px] top-1"></div>
                  <strong className="text-gray-900 block">Resolution</strong>
                  Work order created and issue fixed.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardDetails;
