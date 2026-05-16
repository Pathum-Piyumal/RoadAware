import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Navbar from '../../components/common/Navbar/Navbar';
import styles from './MyReports.module.css';

export default function MyReports() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Header Area */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerText}>
            <p className={styles.headerTag}>Tracking</p>
            <h1 className={styles.headerTitle}>My reports</h1>
            <p className={styles.headerSub}>
              Follow the progress of every hazard you've submitted.
            </p>
          </div>
          <button 
            className={styles.btnNewReport} 
            onClick={() => navigate('/report-hazard')}
          >
            + New report
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className={styles.contentArea}>
        <div className={styles.contentInner}>
          {/* Empty State */}
          <div className={styles.emptyCard}>
            <div className={styles.emptyIcon}>
              <FileText size={48} strokeWidth={1.5} />
            </div>
            <h2 className={styles.emptyTitle}>No reports yet</h2>
            <p className={styles.emptySub}>
              Submit your first hazard report and it'll appear here.
            </p>
            <button 
              className={styles.btnReportHazard}
              onClick={() => navigate('/report-hazard')}
            >
              Report a hazard
            </button>
          </div>
        </div>
      </main>

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
  );
}
