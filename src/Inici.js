import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Estils/Inici.css';
import DivQuiSom from './DivQuiSom';
import LlistatServeis from './LlistatServeis';
import ArticlesBlog from './ArticlesBlog';
import Promocions from './Promocions';
import CtaFlotant from './CtaFlotant';

function Inici() {
  const navigate = useNavigate();

  return (
    <div>
      <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
      <DivQuiSom botoText="Coneixe'ns més!" botoRuta="/qui-som" />
      <section className='divServeis'>
       <LlistatServeis cartaServeisClass='CartaServeisInici' serveisClass='iniciServeis' underlineClass='underlineBlanc' titol="Serveis" limit={5} mode="compacte"></LlistatServeis>
      <button className='Boto BotoVoraBlanca' onClick={() => navigate('/serveis')}>Veure'n més</button>
      </section>      
      <section className='iniciBlog'>
        <ArticlesBlog underlineClass="underline" limit={3} showButton={true} showReadMore={false} />
      </section>
      <section className='divAssessorament'>
        <div className='Titols'>
          <h1>Assessorament</h1>
          <div className='underlineBlanc'></div>
        </div>
        <div className='TextBotoAssessorament'>
          <p className='TextQuiSom'>
            Farmàcia Banyeres és un espai de salut on tu ets el centre. <br /><br />
            Oferim una atenció personalitzada, professional, actualitzada i adaptada a cada pacient.<br />
            La nostra motivació són els nostres pacients i tenir cura de la seva salut.<br />
            Comptem amb un equip qualificat, competent, proper i de confiança que es forma de manera continuada per oferir la millor atenció.
          </p>
          <div className='BotonsAssessorament'>
            <button className='Boto BotoBlanc' onClick={() => navigate("/Assessorament")}>Consulta'ls</button>
            <button className='Boto BotoVoraBlancaTransparent' onClick={() => navigate("/contacte")}>Contacta'ns</button>
          </div>
        </div>
      </section>
      <Promocions></Promocions>
      <CtaFlotant/>
    </div>
  );
}

export default Inici;
