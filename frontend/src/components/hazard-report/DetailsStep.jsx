import React, { useRef } from 'react';
import { Camera, X, FileText, Upload } from 'lucide-react';

const DetailsStep = ({ image, description, onImageChange, onDescriptionChange }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-2">Add photos and details</h2>
      <p className="text-gray-500 mb-8">A clear photo helps our teams prioritize the fix.</p>

      <div className="space-y-6">
        {/* Image Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Camera size={18} className="text-orange-500" />
            Hazard Photo
          </label>
          
          {image ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-orange-100 shadow-sm group">
              <img src={image} alt="Hazard preview" className="w-full h-48 object-cover" />
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
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe the hazard... (e.g. Depth of pothole, number of vehicles involved)"
            className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
