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
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col w-full selection:bg-orange-100 selection:text-orange-950">
      {/* Full-width Colored Header */}
      {!isSuccess && (
        <div className="bg-[#f0f4f8] w-full pt-16 pb-28 border-b border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] -mr-48 -mt-48 pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 relative z-10 animate-fade-in-up">
            <div className="mb-10 text-center md:text-left">
              <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-2 block">Submit a report</span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Report a road hazard.</h1>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                Help authorities respond faster. Precise coordinate tags and clear, high-resolution descriptions ensure rapid road hazard resolution.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center items-center gap-4 mt-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-extrabold transition-all duration-500 ${
                      currentStep === step 
                        ? 'bg-slate-900 text-white shadow-xl scale-110 border-2 border-slate-900' 
                        : currentStep > step 
                          ? 'bg-slate-900 text-white border-2 border-slate-900' 
                          : 'bg-white border-2 border-slate-200 text-slate-400'
                    }`}
                  >
                    {currentStep > step ? <CheckCircle2 size={18} className="text-green-400" /> : step}
                  </div>
                  {step < 3 && (
                    <div className="w-16 md:w-20 h-[3px] mx-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-900 transition-all duration-500" 
                        style={{ width: currentStep > step ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className={`max-w-3xl mx-auto px-4 w-full ${!isSuccess ? '-mt-16 mb-24 relative z-10' : 'py-24'} flex-grow flex flex-col`}>
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 flex-grow flex flex-col transition-all hover:shadow-2xl">
        {!isSuccess ? (
          <>
            {/* Step Remounting Animation Container */}
            <div className="flex-grow animate-fade-in-up" key={currentStep}>
              {currentStep === 1 && <Step1Details formData={formData} updateData={updateData} />}
              {currentStep === 2 && <Step2Location formData={formData} updateData={updateData} />}
              {currentStep === 3 && <Step3Review formData={formData} updateData={updateData} />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
              <button
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                  currentStep === 1 || isSubmitting
                    ? 'text-gray-300 cursor-not-allowed opacity-0 pointer-events-none' 
                    : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                }`}
              >
                <ChevronLeft className="mr-1.5" size={18} /> Back
              </button>
              
              <button
                onClick={nextStep}
                disabled={isSubmitting || (currentStep === 1 && (!formData.type || !formData.title)) || (currentStep === 2 && !formData.address)}
                className={`flex items-center px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-md transition-all hover:bg-slate-800 ${
                  isSubmitting ? 'opacity-70 cursor-wait' : 'cursor-pointer hover:-translate-y-0.5'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:-translate-y-0`}
              >
                {currentStep === totalSteps ? (isSubmitting ? 'Submitting...' : 'Submit Report') : (
                  <>Next: {currentStep === 1 ? 'Location' : 'Review'} <ChevronRight className="ml-1.5" size={18} /></>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100 shadow-lg shadow-green-100/30 scale-100 animate-float">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Report Submitted!</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed text-sm">
              Thank you for contributing to safer roads. Local public work authorities have been alerted with precise coordinates and will start review operations.
            </p>
            <button
              onClick={() => window.location.href = '/my-reports'}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-900/10 hover:bg-orange-600 hover:shadow-orange-600/20 hover:-translate-y-0.5 transition-all cursor-pointer"
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
