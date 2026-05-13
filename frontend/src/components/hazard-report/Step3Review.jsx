import { useRef } from 'react';
import { Camera, MapPin, Tag, Info } from 'lucide-react';

const Step3Review = ({ formData, updateData }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add a photo</h2>
        <p className="text-gray-500 text-sm">A clear photo helps authorities prepare the right equipment. (Optional but highly recommended)</p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-8"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        {formData.image ? (
          <img src={formData.image} alt="Preview" className="h-40 object-contain rounded-lg shadow-sm" />
        ) : (
          <>
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Camera size={28} className="text-blue-600" />
            </div>
            <p className="font-bold text-gray-900 mb-1 text-sm">Tap to take photo or upload</p>
            <p className="text-xs text-gray-500">JPG, PNG, up to 10MB</p>
          </>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Summary</h3>
        <div className="space-y-3">
          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 w-24 flex items-center gap-2"><Tag size={14}/> Type:</span>
            <span className="font-semibold text-gray-900">{formData.type || 'Not specified'}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 w-24 flex items-center gap-2"><Info size={14}/> Title:</span>
            <span className="font-semibold text-gray-900">{formData.title || 'Not specified'}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 w-24 flex items-center gap-2"><MapPin size={14}/> Location:</span>
            <span className="font-semibold text-gray-900">{formData.address || 'Not specified'}{formData.city ? `, ${formData.city}` : ''}</span>
          </div>
          <div className="flex gap-2 text-sm mt-4 pt-4 border-t border-gray-200 items-center">
            <span className="text-gray-500 w-24">Severity:</span>
            <span className="bg-white border px-3 py-1 rounded-full text-xs shadow-sm font-semibold text-gray-900">{formData.severity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step3Review;
