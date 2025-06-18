import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import './Estils/AssessoramentVistaInterior.css';
import Desplegable from './Desplegable';
import PanellDemanarCita from './PanellDemanarCita';
import { useNavigate } from 'react-router-dom';

function AssessoramentVistaInterior() {
  const { id } = useParams();
  const [assessorament, setAssessorament] = useState(null);

  const navigate = useNavigate();
    
  useEffect(() => {
    async function fetchAssessorament() {
      const { data, error } = await supabase
        .from('Assessoraments')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error || !data) {
        navigate('/assessorament');
      } else {
        setAssessorament(data);
      }
    }
  
    fetchAssessorament();
  },[id, navigate]);


  if (!assessorament) return <p>Carregant...</p>;

  return (
    <div className="AssessoramentDetall">
      <div className='divSuperiorAssessorament'>
        <div className='divImatgeAssessorament'>
          <img className='imatgeAssessorament' src={assessorament.Imatge} alt={assessorament.Nom} />
        </div>
        <div className='degradatOverlayAssessorament'></div>
        <div className='divTitolResumAssessorament'>
          <div className="Titols">
            <h1>{assessorament.Nom}</h1>
            <div className="underline blanc"></div>
          </div>
          <p className="Resum resumAssessorament">{assessorament.Resum}</p>
          <PanellDemanarCita id={assessorament.id} tipus="assessorament" />
        </div>
      </div>

      <div className='divInfoAssessorament'>
        <div className="textInfo">
          <h2 className='titolInfo'>En què consisteix?</h2>
          <div className="underline"></div>
        </div>
        <p className='textDetall'>{assessorament.Info}</p>
      </div>

      <div className="detallContingutAssessorament">

        <div className="blocText">
          <h3 className='titolDetall'>Professionals</h3>
          <p className='textDetall'>{assessorament.Professionals}</p>
        </div>

        <div className="blocText">
          <h3 className='titolDetall'>Cost</h3>
          <p className='textDetall'>{assessorament.Cost}</p>
        </div>

        <div className="blocText">
          <h3 className='titolDetall'>Temps estimat</h3>
          <p className='textDetall'>{assessorament.TempsEstimat}</p>
        </div>
      </div>

      <div className="divDubtes">
        <div className="divTitolDubtes">
          <h2 className='titolInfo'>Dubtes sobre l'assessorament</h2>
          <div className="underline"></div>
        </div>

        <Desplegable pregunta="Quina és la modalitat de l'assessorament?" resposta={assessorament.Modalitat} />
        <Desplegable pregunta="Qui es pot beneficiar d'aquest assessorament?" resposta={assessorament.Beneficiaris} />
      </div>
    </div>
  );
}

export default AssessoramentVistaInterior;
