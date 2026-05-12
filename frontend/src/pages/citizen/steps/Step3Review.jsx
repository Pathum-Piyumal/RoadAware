import { useState, useRef } from 'react';
import { useReport } from '../../../context/ReportContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from '../ReportPage.module.css';

const HAZARD_ICONS = {
  Pothole:          '🕳',
  Debris:           '🪨',
  Flooding:         '🌊',
  'Broken Light':   '💡',
  'Damaged Signage':'🚧',
  'Ice / Snow':     '❄️',
  Construction:     '🏗',
  Other:            '⚠️',
};

export default function Step3Review({ onBack }) {
  const { state, updateField, resetReport } = useReport();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef(null);

  /* ── Photo handling ───────────────────────────────── */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateField('photos', [reader.result]);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    updateField('photos', []);
    if (fileRef.current) fileRef.current.value = '';
  };

  const hasPhoto = state.photos && state.photos.length > 0;

  /* ── Submit ───────────────────────────────────────── */
  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setSubmitting(false);
    setSuccess(true);
    toast.success('Report submitted successfully!');
  };

  const handleGoHome = () => {
    resetReport();
    navigate('/');
  };

  /* ── Success state ────────────────────────────────── */
  if (success) {
    return (
      <div className={styles.card}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>
            <span style={{ fontSize: 36 }}>✓</span>
          </div>
          <h2 className={styles.successTitle}>Report Submitted!</h2>
          <p className={styles.successSub}>
            Thank you for helping keep the roads safe. Our team has been notified and will review
            your report shortly.
          </p>
          <button
            className={styles.btnSubmit}
            onClick={handleGoHome}
            style={{ marginTop: 24 }}
            type="button"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── Main render ──────────────────────────────────── */
  const hazardIcon = HAZARD_ICONS[state.hazardType] || '⚠️';
  const locationStr = state.location
    ? `${state.location.lat.toFixed(4)}, ${state.location.lng.toFixed(4)}`
    : '—';

  return (
    <div className={styles.card}>
      {/* ── Photo upload section ──────────────────────── */}
      <h2 className={styles.cardTitle}>Add a photo</h2>
      <p className={styles.cardSub}>
        A clear photo helps authorities assess and prioritize. Optional but recommended.
      </p>

      {hasPhoto ? (
        <div className={styles.previewWrap}>
          <img src={state.photos[0]} alt="Hazard preview" className={styles.previewImg} />
          <button
            className={styles.previewRemove}
            onClick={removePhoto}
            type="button"
            aria-label="Remove photo"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          className={styles.uploadArea}
          onClick={() => fileRef.current?.click()}
          type="button"
        >
          <span className={styles.uploadIcon}>📷</span>
          <span className={styles.uploadText}>Tap to take photo or upload</span>
          <span className={styles.uploadHint}>JPG / PNG, up to 10MB</span>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* ── Compact review summary ────────────────────── */}
      <div className={styles.reviewBox}>
        <div className={styles.reviewBoxHeader}>Review</div>

        <div className={styles.reviewBoxRow}>
          <span className={styles.reviewBoxLabel}>Type:</span>
          <span className={styles.reviewBoxVal}>
            {hazardIcon} {state.hazardType || '—'}
          </span>

          <span className={styles.reviewBoxLabel} style={{ marginLeft: 'auto' }}>
            Severity:
          </span>
          <span className={styles.reviewBoxValBold}>{state.severity}</span>
        </div>

        <div className={styles.reviewBoxRow}>
          <span className={styles.reviewBoxLabel}>Title:</span>
          <span className={styles.reviewBoxValBold}>{state.title || '—'}</span>
        </div>

        {state.description && (
          <div className={styles.reviewBoxRow}>
            <span className={styles.reviewBoxLabel}>Description:</span>
            <span className={styles.reviewBoxVal}>{state.description}</span>
          </div>
        )}

        <div className={styles.reviewBoxRow}>
          <span className={styles.reviewBoxLabel}>Location:</span>
          <span className={styles.reviewBoxValBold}>{locationStr}</span>
        </div>
      </div>

      {/* ── Submitting indicator ──────────────────────── */}
      {submitting && (
        <div className={styles.submittingBar}>
          <span className={styles.spinner} />
          Submitting your report…
        </div>
      )}

      {/* ── Actions ───────────────────────────────────── */}
      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={onBack} disabled={submitting} type="button">
          ← Back
        </button>
        <button
          className={styles.btnSubmit}
          onClick={handleSubmit}
          disabled={submitting}
          type="button"
        >
          {submitting ? 'Submitting…' : 'Submit Report'}
        </button>
      </div>
    </div>
  );
}
