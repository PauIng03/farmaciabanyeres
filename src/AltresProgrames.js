import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

function AltresProgrames({ assessoramentsClass="Assessoraments", underlineClass="underline", titol = "Altres Programes", limit = null }) {
  const [programes, setProgrames] = useState([]);

  useEffect(() => {
    async function fetchProgrames() {
      let query = supabase.from('AltresProgrames').select('*');
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.error('Error carregant altres programes:', error.message);
      } else {
          const programesOrdenats = data.sort((a, b) => (a.Resum?.length || 0) - (b.Resum?.length || 0));
          setProgrames(programesOrdenats);
      }
    }
    fetchProgrames();
  }, [limit]);

  return (
    <div className={assessoramentsClass}>
      <div className='Titols'>
        <h1>{titol}</h1>
        <div className={underlineClass}></div>
      </div>

      <div className="CartesAssessoraments">
        {programes.map((Programa) => (
          <div key={Programa.id} className='CartaAltresProgrames'>
              <img className='IconaCarta' src={Programa.Icona || "https://placehold.co/600x200"} alt={Programa.Nom} />
              <p className='nomAssessoraments'>{Programa.Nom}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AltresProgrames;
