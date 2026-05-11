import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  ['/', 'Home'],
  ['/hazard-map', 'Hazard Map'],
  ['/report-hazard', 'Report'],
  ['/my-reports', 'My Reports'],
];

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <span className={styles.logo}>🛡 RoadAware</span>
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
      <button className={styles.cta} onClick={() => navigate('/report-hazard')}>
        + Report
      </button>
    </nav>
  );
}
