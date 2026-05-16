import { NavLink, useNavigate, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  ['/', 'Home'],
  ['/hazard-map', 'Hazard Map'],
  ['/report-hazard', 'Report'],
  ['/my-reports', 'My Reports'],
];

export default function Navbar({ variant = 'default' }) {
  const navigate = useNavigate();
  
  return (
    <nav className={`${styles.nav} ${styles[variant]}`} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <span>RoadAware</span>
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(([to, label]) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? styles.active : ''}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          {variant === 'homepage' ? (
            <>
              <button className={styles.textBtn}>Log in</button>
              <button className={styles.ctaPrimary} onClick={() => navigate('/report-hazard')}>
                Get started
              </button>
            </>
          ) : (
            <>
              <button className={styles.ctaInner} onClick={() => navigate('/report-hazard')}>
                + Report
              </button>
              <div className={styles.avatar}>
                <span>GU</span>
                <span className={styles.avatarName}>Google</span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}