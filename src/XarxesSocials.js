import React, { useState } from 'react';
import './Estils/XarxesSocials.css';
import { FaInstagram, FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

function XarxesSocials({ menuObert }) {
  const [obert, setObert] = useState(true);

  if (menuObert) return null;

  return (
    <div
      className={`social-floating ${obert ? 'obert' : 'tancat'}`}
      role="complementary"
      aria-label="Xarxes socials flotants"
    >
      {obert ? (
        <>
          <a
            href="https://www.instagram.com/farmaciabanyeres"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita el nostre Instagram"
          >
            <FaInstagram className="icon-social" />
          </a>
          <a
            href="https://www.facebook.com/farmaciabanyeres"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita el nostre Facebook"
          >
            <FaFacebookF className="icon-social" />
          </a>
          <a
            href="tel:977671102"
            aria-label="Truca al 977 671 102"
          >
            <FaPhoneAlt className="icon-social" />
          </a>
          <button
            className="toggle-btn botoFletxaXarxes"
            onClick={() => setObert(false)}
            aria-label="Amaga el menú de xarxes socials"
            aria-expanded="true"
          >
            <FaAngleDoubleRight aria-hidden="true" />
            <span className="sr-only">Amaga xarxes</span>
          </button>
        </>
      ) : (
        <button
          className="toggle-btn botoFletxaXarxes tancat"
          onClick={() => setObert(true)}
          aria-label="Mostra el menú de xarxes socials"
          aria-expanded="false"
        >
          <FaAngleDoubleLeft aria-hidden="true" />
          <span className="sr-only">Mostra xarxes</span>
        </button>
      )}
    </div>
  );
}

export default XarxesSocials;
