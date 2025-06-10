import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import './Estils/ServeisVistaInterior.css';
import Desplegable from './Desplegable';

function ServeisVistaInterior() {
  const { id } = useParams();
  const [servei, setServei] = useState(null);

  useEffect(() => {
    async function fetchServei() {
      const { data, error } = await supabase
        .from('Serveis')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error carregant el servei:', error.message);
      } else {
        setServei(data);
      }
    }

    fetchServei();
  }, [id]);

  if (!servei) return <p>Carregant...</p>;

  return (
    <div className="ServeisDetall">
      <div className='divSuperiorServeis'>
        <div className='divImatgeServei'>
          <img className='imatgeServei' src={servei.Imatge} alt={servei.Nom} />
        </div>
        <div className='degradatOverlay'></div>
        <div className='divTitolResum'>
          <div className="Titols">
            <h1>{servei.Nom}</h1>
            <div className="underline blanc"></div>
          </div>
          <p className="Resum resumServeis">{servei.Resum}</p>
          <button className="Boto botoBlanc">Demanar cita</button>
        </div>
      </div>

      <div className='divInfoServei'>
        <div className="textInfo">
          <h2 className='titolInfo'>En què consisteix?</h2>
          <div className="underline"></div>
        </div>
        <p className='textDetall'>{servei.Info}</p>
      </div>

      <div className="detallContingut">

        <div className="blocText">
          <h3 className='titolDetall'>Professionals</h3>
          <p className='textDetall'>{servei.Professionals}</p>
        </div>

        <div className="blocText">
          <h3 className='titolDetall'>Cost</h3>
          <p className='textDetall'>{servei.Cost}</p>
        </div>

        <div className="blocText">
          <h3 className='titolDetall'>Temps estimat</h3>
          <p className='textDetall'>{servei.TempsEstimat}</p>
        </div>
      </div>

      <div className="divDubtes">
        <div className="divTitolDubtes">
          <h3 className='titolInfo'>Dubtes sobre el servei</h3>
          <div className="underline"></div>
        </div>

        <Desplegable pregunta="Quina és la modalitat del servei?" resposta={servei.Modalitat} />
        <Desplegable pregunta="Qui es pot beneficiar d'aquest servei?" resposta={servei.Beneficiaris} />
      </div>
    </div>
  );
}

export default ServeisVistaInterior;
