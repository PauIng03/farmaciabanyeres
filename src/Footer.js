import React from 'react';
import './Estils/Footer.css';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';

function Footer() {
  return (
    <div className="footer">
      <iframe
        className="footer-img"
        title="Mapa Farmàcia Banyeres"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.3638665967596!2d1.5796909748998866!3d41.27918470270168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a475f26eeae895%3A0xe64bd4ec380476fe!2sFarm%C3%A0cia%20Banyeres!5e0!3m2!1sca!2ses!4v1748248959812!5m2!1sca!2ses"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="footer-col info">
        <div className='section'>
          <div className="title">Farmàcia Banyeres</div>
          <div className="social">
            <div className="icons">
              <div className='text-group'>         
                  <a href="https://www.google.com/maps/place/Farm%C3%A0cia+Banyeres/@41.279181,1.582266,16z/data=!4m6!3m5!1s0x12a475f26eeae895:0xe64bd4ec380476fe!8m2!3d41.2791807!4d1.5822659!16s%2Fg%2F11c2khmfnz?hl=ca&entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text">
                    <FaMapLocation className="icon" /></a><a href="https://www.google.com/maps/place/Farm%C3%A0cia+Banyeres/@41.279181,1.582266,16z/data=!4m6!3m5!1s0x12a475f26eeae895:0xe64bd4ec380476fe!8m2!3d41.2791807!4d1.5822659!16s%2Fg%2F11c2khmfnz?hl=ca&entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text">Plaça Onze de Setembre, s/n <br />
                    43711 Banyeres del Penedès, Tarragona<br /><br />
                  </a>
              </div>
              <div className='text-group'>
                <FaPhoneAlt className="icon" />
                <a href="tel:977671102" className="text">Telef: 977 67 11 02</a>
              </div>
              <div className='text-group'>
                <FaEnvelope className="icon" />
                <a href="mailto:info@farmaciabanyeres.com" className="text">Correu: info@farmaciabanyeres.com</a>
              </div>
            </div>
          </div>
        </div>
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
                <a href="https://www.instagram.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer" className="text">
                  <FaInstagram className="icon" />@farmaciabanyeres
                </a>
              </div>
              <div className='text-group'>
                <a href="https://www.facebook.com/farmaciabanyeres" target="_blank" rel="noopener noreferrer" className="text">
                  <FaFacebookF className="icon" />@farmaciabanyeres
                </a>
              </div>
              <div className='text-group'>
                <a href="tel:977671102" className="text"><FaPhoneAlt className="icon" />977 67 11 02</a>
              </div>
              <div className='text-group'>
                <a href="https://wa.me/34977671102" target="_blank" rel="noopener noreferrer" className="text">
                    <FaWhatsapp className="icon" />977 67 11 02
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
  );
}

export default Footer;
