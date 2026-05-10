import React from 'react';
import { AlertOctagon, Car, Truck, Construction, Wind, Droplets } from 'lucide-react';

const HAZARD_TYPES = [
  { id: 'pothole', label: 'Pothole', icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'accident', label: 'Accident', icon: Car, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'debris', label: 'Debris/Object', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'construction', label: 'Construction', icon: Construction, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'weather', label: 'Weather Issue', icon: Wind, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'flooding', label: 'Flooding', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-50' },
];

const HazardTypeStep = ({ selectedType, onSelect }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-2">What type of hazard did you see?</h2>
      <p className="text-gray-500 mb-8">Select the category that best describes the issue.</p>
      
      <div className="grid grid-cols-2 gap-4">
        {HAZARD_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-200 group ${
                isSelected 
                  ? 'border-orange-500 bg-orange-50/50 shadow-md transform scale-[1.02]' 
                  : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm'
              }`}
            >
              <div className={`p-4 rounded-xl mb-3 transition-colors ${type.bg} ${type.color} group-hover:scale-110 duration-300`}>
                <Icon size={32} />
              </div>
              <span className={`font-semibold ${isSelected ? 'text-orange-700' : 'text-gray-700'}`}>
                {type.label}
              </span>
              
              {isSelected && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-orange-500 rounded-full shadow-sm animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HazardTypeStep;
