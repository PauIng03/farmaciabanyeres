import React from 'react';
import './Estils/Footer.css';
import { FaPhoneAlt, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import Maps from './Maps';

function Footer() {
  return (
    <footer role="contentinfo" className="footer">
      <div className="divInfoFooter">
        <div className="footer-col mapaFooter">
          <Maps />
        </div>
        <div className="footer-col info">
        <address className='section'>
          <div className="title">Farmàcia Banyeres</div>
          <div className="social">
            <div className="icons">
              <div className='text-group adreça'>         
                  <a href="https://www.google.com/maps/place/Farm%C3%A0cia+Banyeres/@41.279181,1.582266,16z/data=!4m6!3m5!1s0x12a475f26eeae895:0xe64bd4ec380476fe!8m2!3d41.2791807!4d1.5822659!16s%2Fg%2F11c2khmfnz?hl=ca&entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text">Plaça Onze de Setembre, s/n <br />
                    43711 Banyeres del Penedès, Tarragona<br />
                  </a>
              </div>
              <div className='text-group'>
                <a href="tel:977671102" className="text">Telef: 977 67 11 02</a>
              </div>
              <div className='text-group'>
                <a href="mailto:info@farmaciabanyeres.com" className="text">Correu: info@farmaciabanyeres.com<br></br><br></br></a>
              </div>
            </div>
          </div>
        </address>
        <div className="section">
          <div className="subtitle">Horari</div>
          <div className="text">
            De dilluns a divendres de 8:00h a 20:00h<br />
            Dissabtes de 9:00h a 14:00h
          </div>
        </div>
      </div>
      <div className="footer-col contact">
        <div className="section">
          <div className="subtitle">Contacte</div>
          <div className="social">
            <div className="icons">
              <div className='text-group'>
                <a href="https://www.instagram.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer" className="text"aria-label="Instagram de Farmàcia Banyeres">
                  <FaInstagram className="icon" aria-hidden="true" />@farmaciabanyeres
                </a>
              </div>
              <div className='text-group'>
                <a href="https://www.facebook.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer" className="text" aria-label="Facebook de Farmàcia Banyeres">
                  <FaFacebookF className="icon" aria-hidden="true"/>@farmaciabanyeres
                </a>
              </div>
              <div className='text-group'>
                <a href="tel:977671102" className="text" aria-label="Telèfon de Farmàcia Banyeres">
                  <FaPhoneAlt className="icon" aria-hidden="true"/>977 67 11 02
                </a>
              </div>
              <div className='text-group'>
                <a href="https://wa.me/34977671102" target="_blank" rel="noopener noreferrer" className="text" aria-label="WhatsApp de Farmàcia Banyeres">
                    <FaWhatsapp className="icon" aria-hidden="true"/>977 67 11 02
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="subtitle">Subscriu-te a la nostra Newsletter!</div>
          <div className="input-box">
            <div className="placeholder">Email</div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
