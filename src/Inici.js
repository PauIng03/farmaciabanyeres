import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Estils/Inici.css';
import DivQuiSom from './DivQuiSom';
import LlistatServeis from './LlistatServeis';
import ArticlesBlog from './ArticlesBlog';
import CtaFlotant from './CtaFlotant';
import LlistatPromocions from './LlistatPromocions';

function Inici() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bannerInici">
        <img src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Imatge banner" className="imatgeBanner" />
        <div className="overlayNegre"></div>
        <div className="contingutBanner">
          <h1 className="titolBanner">Farmàcia Banyeres</h1>
          <p className="subtitolBanner">Som la teva farmàcia</p>
        </div>
      </div>

      <DivQuiSom botoText="Coneixe'ns més!" botoRuta="/qui-som" />
      <section className='divServeis'>
       <LlistatServeis cartaServeisClass='CartaServeisInici' serveisClass='iniciServeis' underlineClass='underlineBlanc' titol="Serveis" limit={5} mode="compacte"></LlistatServeis>
      <button className='Boto BotoVoraBlanca' onClick={() => navigate('/serveis')}>Veure'n més</button>
      </section>      
      <section className='iniciBlog'>
        <ArticlesBlog title = "Blog" underlineClass="underline" limit={3} showButton={true} showReadMore={false} articleindividual={"articleIndividualInici"} />
      </section>
      <section className='divAssessorament inici'>
        <div className='Titols'>
          <h1>Programes</h1>
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
            <button className='Boto BotoBlanc' onClick={() => navigate("/programes")}>Consulta'ls</button>
            <button className='Boto BotoVoraBlancaTransparent' onClick={() => navigate("/contacte")}>Contacta'ns</button>
          </div>
        </div>
      </section>
      <LlistatPromocions></LlistatPromocions>
      <CtaFlotant/>
    </div>
  );
}

export default Inici;
