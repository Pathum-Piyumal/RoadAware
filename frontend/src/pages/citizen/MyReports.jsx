import { useNavigate } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import styles from './MyReports.module.css';

const MyReports = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <div className={styles.badge}>YOUR LOG</div>
          <h1 className={styles.title}>My reports</h1>
          <p className={styles.subtitle}>Track the progress of every hazard you've submitted.</p>
        </div>
        <button className={styles.newReportBtn} onClick={() => navigate('/report-hazard')}>
          <Plus size={16} /> New report
        </button>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.emptyIconWrapper}>
          <FileText size={32} color="#94a3b8" />
        </div>
        <h2 className={styles.emptyTitle}>No reports yet</h2>
        <p className={styles.emptySubtitle}>Submit your first hazard report and it will appear here.</p>
        <button className={styles.newReportBtn} onClick={() => navigate('/report-hazard')}>
          Report a hazard
        </button>
      </div>
    </div>
  );
};

export default MyReports;
