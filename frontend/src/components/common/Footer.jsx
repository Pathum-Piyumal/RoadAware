import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => (
  <footer style={{ background: '#050505', color: '#fff', padding: '72px 32px 32px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, marginBottom: 64 }}>
        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="RoadAware Logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 10 }} />
            <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px' }}>RoadAware</span>
          </Link>
          <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.8, maxWidth: 300 }}>
            RoadAware is a community-driven platform dedicated to improving road safety through
            transparent reporting and verified hazard data for local authorities.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
          {[
            { heading: 'Company', links: ['About Us', 'Features', 'Careers'] },
            { heading: 'Support',  links: ['Help Center', 'Safety Tips', 'Contact'] },
            { heading: 'Connect',  links: [] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#e5e7eb', marginBottom: 20 }}>{col.heading}</h4>
              {col.links.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((l, j) => (
                    <li key={j} style={{ marginBottom: 12 }}>
                      <a href="#" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>{l}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  {[1,2,3].map(n => (
                    <div key={n} style={{ width: 38, height: 38, borderRadius: 10, background: '#111', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#374151', margin: 0 }}>© 2026 ROADAWARE. ALL RIGHTS RESERVED.</p>
        <div style={{ display: 'flex', gap: 32 }}>
          <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#374151', textDecoration: 'none' }}>PRIVACY POLICY</a>
          <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#374151', textDecoration: 'none' }}>TERMS OF SERVICE</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;