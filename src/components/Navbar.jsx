import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/logo1.png';
import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/DarkMode.css';
import '../styles/Navbar.css'

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply dark mode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Auto-collapse on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
          setIsExpanded(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Track navbar collapse state
  useEffect(() => {
    const navbar = document.getElementById('navbarNav');
    const handleShow = () => setIsExpanded(true);
    const handleHide = () => setIsExpanded(false);

    navbar?.addEventListener('shown.bs.collapse', handleShow);
    navbar?.addEventListener('hidden.bs.collapse', handleHide);

    return () => {
      navbar?.removeEventListener('shown.bs.collapse', handleShow);
      navbar?.removeEventListener('hidden.bs.collapse', handleHide);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="The Plug Logo" height="40" className="me-2" />
          <span>The Plug</span>
        </Link>

        {/* Custom Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <FaBars color="#fff" />
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/products', label: 'Products' },
              { to: '/education', label: 'Education' },
              { to: '/sneaker-care', label: 'Sneaker Care' },
              { to: '/services', label: 'Services' },
              { to: '/articles', label: 'Articles' },
              { to: '/pricing', label: 'Pricing' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              <li className="nav-item" key={item.to}>
                <Link className="nav-link" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Dark Mode Switch */}
            <li className="nav-item ms-lg-3">
              <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={() => setDarkMode(!darkMode)}
                checked={darkMode}
              />
              <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <img src={sunIcon} alt="Sun icon" className="sun" />
                <img src={moonIcon} alt="Moon icon" className="moon" />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
