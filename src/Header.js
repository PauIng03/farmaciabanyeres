import React, { useEffect, useState } from 'react';
import './Estils/Header.css';
import { FaUser, FaPhoneAlt, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import XarxesSocials from './XarxesSocials';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [visible, setVisible] = useState(true);
  const [menuObert, setMenuObert] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user || null);

      if (user) {
        const { data: perfilData, error } = await supabase
          .from('Perfils')
          .select('nom')
          .eq('user_id', user.id)
          .single();
        if (!error && perfilData) setPerfil(perfilData);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setPerfil(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (menuObert) return;
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuObert]);

  useEffect(() => {
    document.body.style.overflow = menuObert ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuObert]);

  return (
    <header
      className={`header ${visible ? 'visible' : 'amagat'} ${menuObert ? 'obert' : ''}`}
      role="banner"
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => setMenuObert(false)}
        className={`nav-item ${currentPath === '/' ? 'active' : ''}`}
        aria-label="Inici - Farmàcia Banyeres"
      >
        <img className="logo" src="/Logo.png" alt="Logotip de Farmàcia Banyeres" />
      </Link>

      {/* Accions mòbils */}
      <div className="iconaMenuHamburguesa">
        <Link
          to={user ? '/usuari' : '/inicisessio'}
          className="usuari-responsive"
          aria-label={user ? `Perfil de ${perfil?.nom}` : 'Inicia sessió'}
        >
          <FaUser className="icon-header-responsive" />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuObert(!menuObert)}
          aria-label={menuObert ? "Tanca el menú" : "Obre el menú"}
          aria-expanded={menuObert}
          aria-controls="nav-principal"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Menú de navegació principal */}
      <nav id="nav-principal" className={`nav ${menuObert ? 'obert' : ''}`} role="navigation" aria-label="Navegació principal">
        {[
          { to: '/', label: 'Inici' },
          { to: '/qui-som', label: 'Qui som?' },
          { to: '/serveis', label: 'Serveis' },
          { to: '/assessorament', label: 'Assessorament' },
          { to: '/blog', label: 'Blog' },
          { to: '/promocions', label: 'Promocions' },
          { to: '/contacte', label: 'Contacte' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMenuObert(false)}
            className={`nav-item ${currentPath === to || currentPath.startsWith(to) ? 'active' : ''}`}
            aria-current={currentPath === to ? 'page' : undefined}
          >
            <div>{label}</div>
            {currentPath === to && <div className="underline" />}
          </Link>
        ))}
      </nav>

      {/* Xarxes socials */}
      <div className="social-icons" aria-label="Xarxes socials">
        <a href="https://www.instagram.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className="icon-header" />
        </a>
        <a href="https://www.facebook.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF className="icon-header" />
        </a>
        <a href="tel:977671102" aria-label="Truca al 977 671 102">
          <FaPhoneAlt className="icon-header" />
        </a>
        <a href="https://wa.me/34977671102" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <FaWhatsapp className="icon-header" />
        </a>
      </div>

      {/* Secció usuari */}
      <div className="user">
        {user && perfil ? (
          <div className="login-register registrat">
            <div className="nav-item">Hola {perfil.nom}!</div>
            <Link to="/usuari" aria-label="Anar al meu perfil">
              <FaUser className="icon-header" />
            </Link>
          </div>
        ) : (
          <div className="login-register">
            <Link to="/inicisessio" className={`nav-item ${currentPath.startsWith('/inicisessio') ? 'active' : ''}`}>
              Inicia Sessió
            </Link>
            <div className="separator" aria-hidden="true" />
            <Link to="/registre" className={`nav-item ${currentPath.startsWith('/registre') ? 'active' : ''}`}>
              Registra’t
            </Link>
          </div>
        )}
      </div>

      {/* Xarxes socials flotants */}
      <XarxesSocials menuObert={menuObert} />
    </header>
  );
}

export default Header;
