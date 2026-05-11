import { useState } from 'react';
import { ReportProvider } from '../../context/ReportContext';
import Navbar from '../../components/common/Navbar/Navbar';
import Step1Details from './steps/Step1Details';
import Step2Location from './steps/Step2Location';
import Step3Review from './steps/Step3Review';
import styles from './ReportPage.module.css';

function ReportStepper() {
  const [step, setStep] = useState(1);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <>
      {/* Stepper indicator */}
      <div className={styles.stepper}>
        {[1, 2, 3].map((n, i) => (
          <span key={n} style={{ display: 'contents' }}>
            <span
              className={`${styles.stepDot} ${step === n ? styles.active : ''} ${step > n ? styles.done : ''}`}
            >
              {step > n ? '✓' : n}
            </span>
            {i < 2 && (
              <span className={`${styles.stepLine} ${step > n ? styles.filled : ''}`} />
            )}
          </span>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && <Step1Details onNext={next} />}
      {step === 2 && <Step2Location onNext={next} onBack={back} />}
      {step === 3 && <Step3Review onBack={back} />}
    </>
  );
}

export default function ReportHazard() {
  return (
    <ReportProvider>
      <div className={styles.page}>
        <Navbar />

        {/* Dark header banner */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <p className={styles.headerTag}>Submit a report</p>
            <h1 className={styles.headerTitle}>Report a road hazard</h1>
            <p className={styles.headerSub}>
              Help authorities respond faster. The more detail and accuracy, the quicker the fix.
            </p>
          </div>
        </header>

        <ReportStepper />

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <div className={styles.footerBrandName}>🛡 RoadAware</div>
              <p>A civic platform connecting communities with road authorities.</p>
            </div>
            <div className={styles.footerRight}>
              <h4>Emergency</h4>
              <p>
                For life-threatening hazards, always call <strong>911</strong> first.<br />
                support@roadsafe.com<br />
                +65 1234 5678
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 RoadAware. All rights reserved.</span>
            <span>Report hazards. Stay informed. Save lives.</span>
          </div>
        </footer>
      </div>
    </ReportProvider>
  );
}
