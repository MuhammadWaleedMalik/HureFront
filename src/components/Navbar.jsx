import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';

import colors from '../../styles/colors.module.scss';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Check user role from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDashboardRedirect = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      if (user.role === 'Clinic') {
        navigate('/clinicdashboard');
      } else if (user.role === 'user') {
        navigate('/userdashboard');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href='/login';
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? `${colors.primaryColor1}/90 backdrop-blur-md` : colors.primaryColor1
      }`}
      style={{ backgroundColor: isScrolled ? `${colors.primaryColor1}E6` : colors.primaryColor1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
            />
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span 
                className="text-2xl md:text-3xl italic font-bold font-mono"
                style={{ 
                  color: colors.primaryColor3,
                  fontFamily: 'monospace'
                }}
              >
                H U R E
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Home')}
            </NavLink>
         
            <NavLink 
              to="/core" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Core')}
            </NavLink>
      
            <NavLink 
              to="/hire" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Hire')}
            </NavLink>

            <NavLink 
              to="/event" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Event')}
            </NavLink>

            <NavLink 
              to="/connect" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Connect')}
            </NavLink>

            <NavLink 
              to="/aboutus" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('About HURE')}
            </NavLink>
         
            <NavLink 
              to="/pricing" 
              className="nav-link"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Pricing')}
            </NavLink>
          </div>

          {/* Authentication - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {localStorage.getItem('token') ? (
              <>
                <button 
                  onClick={handleDashboardRedirect}
                  className="px-4 py-2 rounded font-medium transition-colors"
                  style={{
                    backgroundColor: colors.primaryColor4,
                    color: colors.primaryColor3
                  }}
                >
                  {t('Dashboard')}
                </button>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 rounded font-medium transition-colors"
                  style={{
                    backgroundColor: colors.primaryColor5,
                    color: colors.primaryColor3
                  }}
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-4 py-2 rounded font-medium transition-colors"
                  style={{
                    backgroundColor: colors.primaryColor5,
                    color: colors.primaryColor3
                  }}
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 rounded font-medium transition-colors"
                  style={{
                    backgroundColor: colors.primaryColor3,
                    color: colors.primaryColor5
                  }}
                >
                  {t('signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-3xl"
            style={{ color: colors.primaryColor3 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 flex flex-col items-center justify-center pt-24 pb-12 space-y-8 text-xl z-40 md:hidden"
            style={{ 
              backgroundColor: colors.primaryColor5,
              marginTop: '4rem'
            }}
          >
            <NavLink
              to="/"
              onClick={toggleMenu}
              className="nav-link-mobile"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Home')}
            </NavLink>
            <NavLink
              to="/hire"
              onClick={toggleMenu}
              className="nav-link-mobile"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Hire')}
            </NavLink>
            <NavLink
              to="/Event"
              onClick={toggleMenu}
              className="nav-link-mobile"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Event')}
            </NavLink>
            
            <NavLink
              to="/connect"
              onClick={toggleMenu}
              className="nav-link-mobile"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Connect')}
            </NavLink>

            <NavLink
              to="/aboutus"
              onClick={toggleMenu}
              className="nav-link-mobile"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('About')}
            </NavLink>

            <NavLink
              to="/pricing"
              onClick={toggleMenu}
              className="nav-link-mobile"
              style={{ color: colors.primaryColor3 }}
              activeClassName="font-bold"
            >
              {t('Pricing')}
            </NavLink>

            {/* Authentication - Mobile */}
            <div className="flex flex-col space-y-4 mt-8 w-full px-8 max-w-xs">
              {localStorage.getItem('token') ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboardRedirect();
                      toggleMenu();
                    }}
                    className="w-full py-3 rounded font-medium"
                    style={{
                      backgroundColor: colors.primaryColor4,
                      color: colors.primaryColor3
                    }}
                  >
                    {t('Dashboard')}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-full py-3 rounded font-medium"
                    style={{
                      backgroundColor: colors.primaryColor1,
                      color: colors.primaryColor3
                    }}
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="w-full py-3 rounded font-medium text-center"
                    style={{
                      backgroundColor: colors.primaryColor3,
                      color: colors.primaryColor5
                    }}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="w-full py-3 rounded font-medium text-center"
                    style={{
                      backgroundColor: colors.primaryColor1,
                      color: colors.primaryColor3
                    }}
                  >
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          border-radius: 0.25rem;
        }
        .nav-link:hover {
          background-color: ${colors.primaryColor4};
        }
        .nav-link-mobile {
          padding: 1rem 2rem;
          width: 100%;
          text-align: center;
          transition: all 0.3s ease;
        }
        .nav-link-mobile:hover {
          background-color: ${colors.primaryColor4};
        }
      `}</style>
    </nav>
  );
};

export default Navbar;