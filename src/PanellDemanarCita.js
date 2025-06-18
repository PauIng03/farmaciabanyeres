import React, { useState } from 'react';
import './Estils/PanellDemanarCita.css';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineFormatListBulleted, MdKeyboardArrowRight } from "react-icons/md";

function PanellDemanarCita({ id, tipus }) {
  const [obert, setObert] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setObert(!obert);
  };

  return (
    
    <div className='divBotoDemanarCita'>

      {tipus === 'assessorament' && obert && (
        <div className="panellDemanarCitaAssessorament">
          <div className="capcaleraDemanarCitaAssessorament">
            <span className='textSuperiorPanell'>Com vols demanar cita?</span>
            <button className='creuBotoFlotantDemanarCitaAssessorament' onClick={() => setObert(false)}>✖</button>
          </div>
          <div className="cos">
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="botoPanellDemanarCitaAssessorament botoWhatsAppDemanarCita"
            >
              <div className='iconaBotoDemanarCita'>
                <FaWhatsapp className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Obrir WhatsApp</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </a>            
            <button
              onClick={() => navigate(`/${tipus}/${id}/demanar-cita`)}
              className="botoPanellDemanarCitaAssessorament"
            >
              <div className='iconaBotoDemanarCita'>
                <MdOutlineFormatListBulleted className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Formulari Web</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </button>
            <a
              href="tel:977671102"
              target="_blank"
              rel="noopener noreferrer"
              className="botoPanellDemanarCitaAssessorament "
            >
              <div className='iconaBotoDemanarCita'>
                <FaPhoneAlt className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Telèfon</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </a>
          </div>
        </div>
      )}

      {(tipus === 'serveis' || tipus === 'assessorament') && (
      <button className={`Boto botoBlanc BotoDemanarCita ${obert ? 'amagatMobil' : ''}`}
      onClick={handleClick}>
        Demanar cita
      </button>
      )}
      
      {tipus === 'promocions' && (
      <button className={`Boto botoRosa BotoDemanarCita ${obert ? 'amagatMobilPromocions' : ''}`}
      onClick={handleClick}>
        Encarregar-la
      </button>
      )}

      {tipus === 'serveis' && obert && (
        <div className="panellDemanarCitaServeis">
          <div className="capcaleraDemanarCita">
            <span className='textSuperiorPanell'>Com vols demanar cita?</span>
            <button className='creuBotoFlotantDemanarCita ' onClick={() => setObert(false)}>✖</button>
          </div>
          <div className="cos">
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="botoPanellDemanarCita  botoWhatsAppDemanarCita"
            >
              <div className='iconaBotoDemanarCita'>
                <FaWhatsapp className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Obrir WhatsApp</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </a>            
            <button
              onClick={() => navigate(`/${tipus}/${id}/demanar-cita`)}
              className="botoPanellDemanarCita "
            >
              <div className='iconaBotoDemanarCita'>
                <MdOutlineFormatListBulleted className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Formulari Web</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </button>
            <a
              href="tel:977671102"
              target="_blank"
              rel="noopener noreferrer"
              className="botoPanellDemanarCita "
            >
              <div className='iconaBotoDemanarCita'>
                <FaPhoneAlt className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Telèfon</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </a>
          </div>
        </div>
      )}
      {tipus === 'promocions' && obert && (
        <div className="panellDemanarCitaServeis">
          <div className="capcaleraDemanarCita">
            <span className='textSuperiorPanell'>Encarregar-la</span>
            <button className='creuBotoFlotantDemanarCita ' onClick={() => setObert(false)}>✖</button>
          </div>
          <div className="cos">
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="botoPanellDemanarCita  botoWhatsAppDemanarCita"
            >
              <div className='iconaBotoDemanarCita'>
                <FaWhatsapp className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Obrir WhatsApp</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </a>            
            <button
              onClick={() => navigate(`/${tipus}/${id}/encarrec`)}
              className="botoPanellDemanarCita "
            >
              <div className='iconaBotoDemanarCita'>
                <MdOutlineFormatListBulleted className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Formulari Web</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </button>
            <a
              href="tel:977671102"
              target="_blank"
              rel="noopener noreferrer"
              className="botoPanellDemanarCita "
            >
              <div className='iconaBotoDemanarCita'>
                <FaPhoneAlt className="iconaDemanarCita" /><p className='textBotonsPanellDemanarCita'>Telèfon</p>
              </div>
              <MdKeyboardArrowRight className="iconaDemanarCita" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanellDemanarCita;
