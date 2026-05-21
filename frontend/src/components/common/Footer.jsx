import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Footer = () => (
  <footer style={{ background: '#050505', color: '#94a3b8', padding: '100px 0 40px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
    {/* Background Decorative Element */}
    <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'rgba(249, 115, 22, 0.03)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />
    
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-20">
        
        {/* Brand Section */}
        <div className="col-span-1 sm:col-span-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <img src={logo} alt="RoadAware Logo" style={{ height: 32, width: 'auto' }} />
            <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em' }}>ROADAWARE</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#64748b', maxWidth: 320, marginBottom: 32 }}>
            Building safer communities through real-time infrastructure intelligence and community vigilance.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { Icon: FaFacebook, href: 'https://facebook.com' },
              { Icon: FaLinkedin, href: 'https://linkedin.com' },
              { Icon: FaTwitter, href: 'https://twitter.com' },
              { Icon: FaGithub, href: 'https://github.com' }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.03)', 
                  display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#94a3b8',
                  transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
                  e.currentTarget.style.color = '#f97316';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <social.Icon size={18} style={{ marginTop: 10 }} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: 'About Us', path: '/about' },
              { name: 'Features', path: '/features' },
              { name: 'Careers', path: '/careers' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'all 0.2s', fontWeight: 500 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: 'Help Center', path: '/help-center' },
              { name: 'Safety Tips', path: '/safety-tips' },
              { name: 'FAQ', path: '/help-center' },
              { name: 'Status', path: '/status' }
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'all 0.2s', fontWeight: 500 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <p style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>© 2026 RoadAware. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 32 }}>
          <Link to="/privacy-policy" style={{ fontSize: 13, color: '#475569', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>Privacy Policy</Link>
          <Link to="/terms-of-service" style={{ fontSize: 13, color: '#475569', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;