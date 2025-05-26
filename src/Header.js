import React from 'react';
import './Estils/Header.css';
import { FaUser, FaPhoneAlt, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

function Header() {
  return (
    <div className="header">
      <img className="logo" src="/Logo.png" alt="Logo" />
      
      <div className="nav">
        <div className="nav-item active">
          <div>Inici</div>
          <div className="underline" />
        </div>
        <div className="nav-item">Qui som?</div>
        <div className="nav-item">Serveis</div>
        <div className="nav-item">Assessorament</div>
        <div className="nav-item">Blog</div>
        <div className="nav-item">Promocions</div>
        <div className="nav-item">Contacte</div>
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
