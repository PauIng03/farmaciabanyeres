import React from 'react';
import './Estils/Header.css';
import { FaUser, FaPhoneAlt, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="header">
        <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
          <div><img className="logo" src="/Logo.png" alt="Logo" /></div>
        </Link>

      <div className="nav">
        <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
          <div>Inici</div>
          {currentPath === '/' && <div className="underline" />}
        </Link>
        <Link to="/qui-som" className={`nav-item ${currentPath === '/qui-som' ? 'active' : ''}`}>
          <div>Qui som?</div>
          {currentPath === '/qui-som' && <div className="underline" />}
        </Link>
        <Link to="/serveis" className={`nav-item ${currentPath.startsWith('/serveis') ? 'active' : ''}`}>
          <div>Serveis</div>
          {currentPath.startsWith('/serveis') && <div className="underline" />}
        </Link>
        <Link to="/assessorament" className={`nav-item ${currentPath === '/assessorament' ? 'active' : ''}`}>
          <div>Assessorament</div>
          {currentPath === '/assessorament' && <div className="underline" />}
        </Link>
        <Link to="/blog" className={`nav-item ${currentPath.startsWith('/blog') ? 'active' : ''}`}>
          <div>Blog</div>
          {currentPath.startsWith('/blog') && <div className="underline" />}
        </Link>
        <Link to="/promocions" className={`nav-item ${currentPath === '/promocions' ? 'active' : ''}`}>
          <div>Promocions</div>
          {currentPath === '/promocions' && <div className="underline" />}
        </Link>
        <Link to="/contacte" className={`nav-item ${currentPath === '/contacte' ? 'active' : ''}`}>
          <div>Contacte</div>
          {currentPath.startsWith('/contacte') && <div className="underline" />}
        </Link>
      </div>

      <div className="social-icons">
        <a href="https://www.instagram.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon-header" />
        </a>
        <a href="https://www.facebook.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="icon-header" />
        </a>
        <a href="tel:977671102">
          <FaPhoneAlt className="icon-header" />
        </a>
        <a href="https://wa.me/34977671102" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="icon-header" />
        </a>
      </div>

      <div className="user">
        <div className="login-register">
          <div className="nav-item">Inicia Sessió</div>
          <div className="separator" />
          <div className="nav-item">Registra’t</div>
        </div>
        <div className="icon">
          <FaUser className="icon-header" />
        </div>
      </div>
    </div>
  );
}

export default Header;