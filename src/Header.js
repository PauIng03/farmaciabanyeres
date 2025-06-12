import React, { useEffect, useState } from 'react';
import './Estils/Header.css';
import { FaUser, FaPhoneAlt, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Comprovar usuari al carregar
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user || null);

      if (user) {
        // Agafar el perfil amb el nom des de la taula Perfils
        const { data: perfilData, error } = await supabase
          .from('Perfils')
          .select('nom')
          .eq('user_id', user.id)
          .single();

        if (!error && perfilData) {
          setPerfil(perfilData);
        }
      }
    };

    getUser();

    // També escoltem canvis d'autenticació (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Podries tornar a carregar el perfil si vols
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
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // scroll avall → amaga
      } else {
        setVisible(true); // scroll amunt → mostra
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${visible ? 'visible' : 'amagat'}`}>
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
        <Link to="/assessorament" className={`nav-item ${currentPath.startsWith('/assessorament') ? 'active' : ''}`}>
          <div>Assessorament</div>
          {currentPath.startsWith('/assessorament') && <div className="underline" />}
        </Link>
        <Link to="/blog" className={`nav-item ${currentPath.startsWith('/blog') ? 'active' : ''}`}>
          <div>Blog</div>
          {currentPath.startsWith('/blog') && <div className="underline" />}
        </Link>
        <Link to="/promocions" className={`nav-item ${currentPath === '/promocions' ? 'active' : ''}`}>
          <div>Promocions</div>
          {currentPath === '/promocions' && <div className="underline" />}
        </Link>
        <Link to="/contacte" className={`nav-item ${currentPath.startsWith('/contacte') ? 'active' : ''}`}>
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
        {user && perfil ? (
          <div className="login-register registrat">
            <div className="nav-item">Hola {perfil.nom}!</div>
            <div className="icon">
              <FaUser className="icon-header" />
            </div>
          </div>
        ) : (
          <div className="login-register">
            <Link to="/inicisessio" className={`nav-item ${currentPath.startsWith('/inicisessio') ? 'active' : ''}`}>
              <div className="nav-item">Inicia Sessió</div>
            </Link>
            <div className="separator" />
            <Link to="/registre" className={`nav-item ${currentPath.startsWith('/registre') ? 'active' : ''}`}>
              <div className="nav-item">Registra’t</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
