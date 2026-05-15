import { AlertTriangle, Car, Truck, Construction, Droplets, Type } from 'lucide-react';

const HAZARD_TYPES = [
  { id: 'Pothole', icon: AlertTriangle, label: 'Pothole' },
  { id: 'Debris', icon: Car, label: 'Debris' },
  { id: 'Flooding', icon: Droplets, label: 'Flooding' },
  { id: 'Signage', icon: Type, label: 'Signage' },
  { id: 'Signal', icon: Truck, label: 'Broken Signal' },
  { id: 'Other', icon: Construction, label: 'Other' },
];

const Step1Details = ({ formData, updateData }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What did you find?</h2>
        <p className="text-gray-500 text-sm">Pick the hazard category that best describes it.</p>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3">Hazard type *</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {HAZARD_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.type === type.id;
            return (
              <button
                key={type.id}
                onClick={() => updateData({ type: type.id })}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50/30'
                }`}
              >
                <Icon size={22} className="mb-2" />
                <span className="text-xs font-semibold">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3">Severity *</label>
        <div className="flex gap-3">
          {['Low', 'Medium', 'High', 'Critical'].map(level => (
            <button
              key={level}
              onClick={() => updateData({ severity: level })}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                formData.severity === level
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-2">What is it? *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="e.g. Deep pothole in right lane"
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:shadow-sm transition-all text-sm"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Add details about size, exact location, hazard level, or anything else..."
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:shadow-sm transition-all h-32 resize-none text-sm"
        />
      </div>
    </div>
  );
};
export default Step1Details;
