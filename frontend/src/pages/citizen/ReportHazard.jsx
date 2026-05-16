import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Step1Details from '../../components/hazard-report/DetailsStep';
import Step2Location from '../../components/hazard-report/LocationStep';
import Step3Review from '../../components/hazard-report/ReviewStep';

const ReportHazard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    type: '',
    severity: 'Medium',
    title: '',
    description: '',
    location: null,
    address: '',
    city: '',
    image: null,
  });

  const totalSteps = 3;

  const updateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    // Basic validation
    if (currentStep === 1 && (!formData.type || !formData.title)) return;
    if (currentStep === 2 && !formData.address) return;
    
    if (currentStep === totalSteps) {
      handleSubmission();
      return;
    }
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmission = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col w-full">
      {/* Full-width Colored Header */}
      {!isSuccess && (
        <div className="bg-[#f0f4f8] w-full pt-16 pb-28 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-10 text-center md:text-left">
              <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-2 block">Submit a report</span>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Report a road hazard</h1>
              <p className="text-gray-500 text-sm">Help authorities respond faster. The more detail and accuracy, the quicker the fix.</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center items-center gap-4 mt-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                      currentStep === step 
                        ? 'bg-[#0f172a] text-white shadow-md' 
                        : currentStep > step 
                          ? 'bg-[#0f172a] text-white' 
                          : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                  >
                    {currentStep > step ? <CheckCircle2 size={16} /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-[2px] mx-2 ${currentStep > step ? 'bg-[#0f172a]' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className={`max-w-3xl mx-auto px-4 w-full ${!isSuccess ? '-mt-16 mb-20 relative z-10' : 'py-20'} flex-grow flex flex-col`}>
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex-grow flex flex-col">
        {!isSuccess ? (
          <>
            <div className="flex-grow">
              {currentStep === 1 && <Step1Details formData={formData} updateData={updateData} />}
              {currentStep === 2 && <Step2Location formData={formData} updateData={updateData} />}
              {currentStep === 3 && <Step3Review formData={formData} updateData={updateData} />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  currentStep === 1 || isSubmitting
                    ? 'text-gray-300 cursor-not-allowed opacity-0' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="mr-1" size={18} /> Back
              </button>
              
              <button
                onClick={nextStep}
                disabled={isSubmitting || (currentStep === 1 && (!formData.type || !formData.title)) || (currentStep === 2 && !formData.address)}
                className={`flex items-center px-6 py-2.5 bg-[#0f172a] text-white rounded-xl font-semibold text-sm shadow-sm transition-all hover:bg-[#1e293b] ${
                  isSubmitting ? 'opacity-70 cursor-wait' : ''
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {currentStep === totalSteps ? (isSubmitting ? 'Submitting...' : 'Submit Report') : (
                  <>Next: {currentStep === 1 ? 'Location' : 'Details'} <ChevronRight className="ml-1" size={18} /></>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Report Submitted!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Thank you for reporting this hazard. Local authorities have been notified and will review it shortly.</p>
            <button
              onClick={() => window.location.href = '/my-reports'}
              className="px-8 py-3 bg-[#0f172a] text-white rounded-xl font-bold shadow-md hover:bg-[#1e293b] transition-all"
            >
              View My Reports
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;
