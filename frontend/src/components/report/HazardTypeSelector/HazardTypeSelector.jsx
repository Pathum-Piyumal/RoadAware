import { useReport } from '../../../context/ReportContext';
import styles from './HazardTypeSelector.module.css';

const HAZARDS = [
  { type: 'Pothole',         icon: '🕳',  label: 'Pothole' },
  { type: 'Debris',          icon: '🪨',  label: 'Debris' },
  { type: 'Flooding',        icon: '🌊',  label: 'Flooding' },
  { type: 'Broken Light',    icon: '💡',  label: 'Broken Light' },
  { type: 'Damaged Signage', icon: '🚧',  label: 'Damaged Signage' },
  { type: 'Ice / Snow',      icon: '❄️',  label: 'Ice / Snow' },
  { type: 'Construction',    icon: '🏗',  label: 'Construction' },
  { type: 'Other',           icon: '⚠️',  label: 'Other' },
];

export default function HazardTypeSelector() {
  const { state, updateField } = useReport();

  return (
    <div role="radiogroup" aria-label="Hazard type" className={styles.grid}>
      {HAZARDS.map(({ type, icon, label }) => (
        <button
          key={type}
          role="radio"
          aria-checked={state.hazardType === type}
          className={[styles.card, state.hazardType === type ? styles.selected : ''].join(' ')}
          onClick={() => updateField('hazardType', type)}
          type="button"
        >
          <span className={styles.icon} aria-hidden="true">{icon}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
}