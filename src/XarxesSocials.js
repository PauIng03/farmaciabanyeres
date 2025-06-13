import React, { useState } from 'react';
import './Estils/XarxesSocials.css';
import { FaInstagram, FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

function XarxesSocials({ menuObert }) {
  const [obert, setObert] = useState(true);

  if (menuObert) return null;

  return (
    <div className={`social-floating ${obert ? 'obert' : 'tancat'}`}>
      {obert ? (
        <>
            <a href="https://www.instagram.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon-social" />
            </a>
            <a href="https://www.facebook.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="icon-social" />
            </a>
            <a href="tel:977671102">
              <FaPhoneAlt className="icon-social" />
            </a>
          <button className="toggle-btn botoFletxaXarxes" onClick={() => setObert(false)}>
            <FaAngleDoubleRight />
          </button>
        </>
      ) : (
        <button className="toggle-btn botoFletxaXarxes tancat" onClick={() => setObert(true)}>
          <FaAngleDoubleLeft />
        </button>
      )}
    </div>
  );
}

export default XarxesSocials;
