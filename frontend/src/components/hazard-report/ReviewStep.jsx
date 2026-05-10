import React from 'react';
import { AlertTriangle, MapPin, Camera, FileText, CheckCircle2 } from 'lucide-react';

const ReviewStep = ({ formData, isSubmitting, isSuccess }) => {
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 py-8">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
        <p className="text-gray-600 max-w-xs">
          Thank you for helping us keep the roads safe. Our team has been notified.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-2">Review your report</h2>
      <p className="text-gray-500 mb-8">Make sure everything is correct before submitting.</p>

      <div className="space-y-4">
        {/* Hazard Type Summary */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hazard Type</p>
            <p className="text-gray-900 font-medium capitalize">{formData.type}</p>
          </div>
        </div>

        {/* Location Summary */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</p>
            <p className="text-gray-900 font-medium">
              {formData.location 
                ? `${formData.location.lat.toFixed(4)}, ${formData.location.lng.toFixed(4)}`
                : 'Not specified'}
            </p>
          </div>
        </div>

        {/* Photo Summary */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <Camera size={20} />
          </div>
          <div className="flex-grow">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Photo</p>
            {formData.image ? (
              <div className="mt-2 w-24 h-16 rounded-lg overflow-hidden border border-gray-200">
                <img src={formData.image} alt="Hazard preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <p className="text-gray-500 italic">No photo provided</p>
            )}
          </div>
        </div>

        {/* Description Summary */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <FileText size={20} />
          </div>
          <div className="flex-grow">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</p>
            <p className="text-gray-900 text-sm mt-1 leading-relaxed">
              {formData.description || <span className="text-gray-500 italic">No additional details provided</span>}
            </p>
          </div>
        </div>
      </div>
      
      {isSubmitting && (
        <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-center gap-3 text-orange-700">
          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-medium">Submitting your report...</span>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
