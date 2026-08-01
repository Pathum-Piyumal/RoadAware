import { useRef } from 'react';
import { Camera, X, FileText, Upload, AlertTriangle, Type, ShieldAlert } from 'lucide-react';

const DetailsStep = ({ formData, updateData }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ image: reader.result, imageFile: file }); // base64 preview + real File
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateData({ image: null, imageFile: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const severityOptions = [
    {
      id: 'low',
      label: 'Low',
      description: 'Minor issue; minimal traffic risk',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      activeColor: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'medium',
      label: 'Medium',
      description: 'Moderate hazard; caution advised',
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
      activeColor: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'high',
      label: 'High',
      description: 'Significant danger or damage risk',
      color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
      activeColor: 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'critical',
      label: 'Critical',
      description: 'Immediate severe safety emergency',
      color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
      activeColor: 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20',
      badgeColor: 'bg-red-100 text-red-800'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-2">Add details and photos</h2>
      <p className="text-gray-500 mb-8">Provide clear information to help teams prioritize the fix.</p>

      <div className="space-y-6">
        {/* Title Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Type size={18} className="text-orange-500" />
            Report Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateData({ title: e.target.value })}
            placeholder="e.g. Deep pothole on Main St"
            className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
          />
        </div>

        {/* Type Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-500" />
            Hazard Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => {
              const selectedType = e.target.value;
              const categoryMap = {
                'Pothole': 1,
                'Debris': 2,
                'Flooding': 3,
                'Streetlight': 4,
                'Construction': 6,
                'Animal': 7,
                'Other': 7
              };
              updateData({
                type: selectedType,
                categoryId: categoryMap[selectedType] || 7
              });
            }}
            className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm appearance-none"
          >
            <option value="" disabled>Select a hazard type...</option>
            <option value="Pothole">Pothole</option>
            <option value="Flooding">Flooding</option>
            <option value="Debris">Debris/Object</option>
            <option value="Construction">Construction</option>
            <option value="Streetlight">Broken Streetlight</option>
            <option value="Animal">Animal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Severity Level Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <ShieldAlert size={18} className="text-orange-500" />
            Severity Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {severityOptions.map((option) => {
              const isSelected = (formData.severity || 'medium').toLowerCase() === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateData({ severity: option.id })}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected ? option.activeColor : `bg-white border-slate-200 text-slate-700 hover:border-slate-300`
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm tracking-wide">{option.label}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white' : option.badgeColor.split(' ')[0].replace('bg-', 'bg-')}`} />
                  </div>
                  <span className={`text-[11px] leading-tight ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Camera size={18} className="text-orange-500" />
            Hazard Photo
          </label>
          
          {formData.image ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-orange-100 shadow-sm group">
              <img src={formData.image} alt="Hazard preview" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={removeImage}
                  className="bg-white/90 p-2 rounded-full text-red-500 hover:bg-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-all group"
            >
              <div className="p-4 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform mb-3">
                <Upload className="text-gray-400 group-hover:text-orange-500" size={24} />
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-700">Click to upload photo</span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Description Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={18} className="text-orange-500" />
            Additional Details (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Describe the hazard... (e.g. Depth of pothole, number of vehicles involved)"
            className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
