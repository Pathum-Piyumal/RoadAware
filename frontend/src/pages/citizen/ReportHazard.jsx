import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, MapPin, Camera, CheckCircle2 } from 'lucide-react';
import HazardTypeStep from '../../components/hazard-report/HazardTypeStep';
import LocationStep from '../../components/hazard-report/LocationStep';

const ReportHazard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    location: null,
    image: null,
    description: ''
  });
  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep === 1 && !formData.type) return;
    if (currentStep === 2 && !formData.location) return;
    
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const steps = [
    { id: 1, title: 'Hazard Type', icon: AlertTriangle },
    { id: 2, title: 'Location', icon: MapPin },
    { id: 3, title: 'Details', icon: Camera },
    { id: 4, title: 'Review', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Report a Road Hazard
        </h1>
        <p className="text-gray-600 mt-2">Help keep our roads safe by reporting issues you encounter.</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-12 relative">
        <div className="flex justify-between items-center relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200' 
                        : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                </div>
                <span className={`mt-2 text-xs font-medium ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100 -z-0">
          <div 
            className="h-full bg-orange-500 transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content Area */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 min-h-[400px] flex flex-col">
        <div className="flex-grow">
          {currentStep === 1 && (
            <HazardTypeStep 
              selectedType={formData.type} 
              onSelect={(type) => setFormData(prev => ({ ...prev, type }))} 
            />
          )}
          
          {currentStep === 2 && (
            <LocationStep 
              location={formData.location} 
              onLocationChange={(location) => setFormData(prev => ({ ...prev, location }))} 
            />
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-semibold mb-4">Add photos and details</h2>
              <p className="text-gray-500 mb-6">A clear photo helps our teams prioritize the fix.</p>
              <div className="space-y-4">
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
                  Media upload will be implemented in Step 4.
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
              <p className="text-gray-500 mb-6">Please check the details before sending the report.</p>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 text-orange-800">
                Summary view will be implemented in Step 5.
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="mr-2" size={20} />
            Back
          </button>
          
          <button
            onClick={nextStep}
            className={`flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 ${
              (currentStep === 1 && !formData.type) || (currentStep === 2 && !formData.location) ? 'opacity-50 cursor-not-allowed grayscale' : ''
            }`}
          >
            {currentStep === totalSteps ? 'Submit Report' : 'Continue'}
            {currentStep !== totalSteps && <ChevronRight className="ml-2" size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;
