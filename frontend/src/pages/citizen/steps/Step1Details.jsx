import { useReport } from '../../../context/ReportContext';
import HazardTypeSelector from '../../../components/report/HazardTypeSelector/HazardTypeSelector';
import SeveritySelector from '../../../components/report/SeveritySelector/SeveritySelector';
import styles from '../ReportPage.module.css';

export default function Step1Details({ onNext }) {
  const { state, updateField } = useReport();
  const canProceed = state.title.trim().length > 0;

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>What did you find?</h2>
      <p className={styles.cardSub}>Pick the hazard type and how serious it is.</p>

      <label className={styles.fieldLabel}>Hazard type *</label>
      <HazardTypeSelector />

      <label className={styles.fieldLabel}>Severity *</label>
      <SeveritySelector />

      <label className={styles.fieldLabel} htmlFor="report-title">Short title *</label>
      <input
        id="report-title"
        className={styles.input}
        type="text"
        placeholder="e.g. Deep pothole near bus stop"
        value={state.title}
        onChange={e => updateField('title', e.target.value)}
        aria-required="true"
        maxLength={80}
      />

      <label className={styles.fieldLabel} htmlFor="report-desc">Description</label>
      <textarea
        id="report-desc"
        className={styles.textarea}
        rows={4}
        placeholder="Add helpful details: size, when it appeared, hazard to pedestrians/cyclists…"
        value={state.description}
        onChange={e => updateField('description', e.target.value)}
      />

      <div className={styles.actions}>
        <button
          className={styles.btnNext}
          onClick={onNext}
          disabled={!canProceed}
          aria-disabled={!canProceed}
          type="button"
        >
          Next: Location →
        </button>
      </div>
    </div>
  );
}