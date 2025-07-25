import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isExpanded, setIsExpanded] = useState(false);

  // Apply dark mode class on mount and toggle
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Auto-collapse navbar when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click(); // Simulate click to close the navbar
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Track navbar collapse/expand state
  useEffect(() => {
    const navbar = document.getElementById('navbarNav');
    const handleShowEvent = () => setIsExpanded(true);
    const handleHideEvent = () => setIsExpanded(false);

    navbar?.addEventListener('shown.bs.collapse', handleShowEvent);
    navbar?.addEventListener('hidden.bs.collapse', handleHideEvent);

    return () => {
      navbar?.removeEventListener('shown.bs.collapse', handleShowEvent);
      navbar?.removeEventListener('hidden.bs.collapse', handleHideEvent);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="The Plug Logo" height="40" className="me-2" />
          <span>The Plug</span>
        </Link>

        {/* Toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          title="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/education">Education</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sneaker-care">Sneaker Care</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/articles">Articles</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

            {/* Dark mode toggle */}
            <li className="nav-item ms-lg-3">
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;