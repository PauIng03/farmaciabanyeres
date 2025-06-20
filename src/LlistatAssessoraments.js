import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

function LlistatAssessoraments({ assessoramentsClass="Assessoraments", underlineClass="underline", titol = "Programes", limit = null, mode = "complet" }) {
  const [assessoraments, setAssessoraments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssessoraments() {
      let query = supabase.from('Assessoraments').select('*');
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.error('Error carregant assessoraments:', error.message);
      } else {
          const assessoramentsOrdenats = data.sort((a, b) => (a.Resum?.length || 0) - (b.Resum?.length || 0));
          setAssessoraments(assessoramentsOrdenats);
      }
    }
    fetchAssessoraments();
  }, [limit]);

  return (
    <div className={assessoramentsClass}>
      <div className='Titols'>
        <h1>{titol}</h1>
        <div className={underlineClass}></div>
      </div>

      <div className="CartesAssessoraments">
        {assessoraments.map((assessorament) => (
          <div key={assessorament.id} className='CartaAssessoraments'>
            <div className='IconoNom'>
              <img className='IconaCarta' src={assessorament.Icona || "https://placehold.co/600x200"} alt={assessorament.Nom} />
              <p className='nomInici'>{assessorament.Nom}</p>
            </div>

            {mode === "complet" && (
              <div className='InfoFotoAssessoraments'>
                <div className='InfoAssessoraments'>
                  <p className='nomAssessoraments'>{assessorament.Nom}</p>
                  <p className='Resum'>{assessorament.Resum}</p>
                </div>
                <button className='BotoRosa' onClick={() => navigate(`/programes/${assessorament.id}`)}>Veure'n més</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LlistatAssessoraments;
