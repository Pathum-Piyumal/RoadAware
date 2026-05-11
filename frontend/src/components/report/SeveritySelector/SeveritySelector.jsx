import { useReport } from '../../../context/ReportContext';
import styles from './SeveritySelector.module.css';

const LEVELS = ['Low', 'Medium', 'High', 'Critical'];

export default function SeveritySelector() {
  const { state, updateField } = useReport();

  return (
    <div role="radiogroup" aria-label="Severity level" className={styles.group}>
      {LEVELS.map(level => (
        <button
          key={level}
          role="radio"
          aria-checked={state.severity === level}
          className={[styles.btn, state.severity === level ? styles.active : ''].join(' ')}
          onClick={() => updateField('severity', level)}
          type="button"
        >
          {level}
        </button>
      ))}
    </div>
  );
}