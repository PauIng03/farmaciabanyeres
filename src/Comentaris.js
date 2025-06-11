import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from './lib/supabaseClient';
import { MdOutlineQuestionAnswer } from "react-icons/md";
import ComentarisForm from './ComentarisForm';
import './Estils/Comentaris.css';

function Comentaris({ articleId }) {
  const [comentaris, setComentaris] = useState([]);
  const [respostaA, setRespostaA] = useState(null); // 👈 estat nou

  const carregarComentaris = useCallback(async () => {
    const { data, error } = await supabase
      .from('Comentaris')
      .select('id, comentari, created_at, resposta_a, Perfils (nom, cognom)')
      .eq('article_id', articleId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error carregant comentaris:', error.message);
    } else {
      setComentaris(data);
    }
  }, [articleId]);

  useEffect(() => {
    carregarComentaris();
  }, [carregarComentaris]);

  const renderComentaris = (comentaris, respostaA = null, nivell = 0) => {
    return comentaris
      .filter(c => c.resposta_a === respostaA)
      .map(c => (
        <div key={c.id} className="comentari" style={{ marginLeft: nivell * 20 }}>
          <div className='divTitolResposta'>
            <p>
                <strong className='titolPComentari'>
                {c.Perfils?.nom + " " + c.Perfils?.cognom || 'Anònim'}
                </strong> - {new Date(c.created_at).toLocaleString()}
            </p>

          <p>{c.comentari}</p>
          <button className="botoResposta" onClick={() => setRespostaA(c.id)}>
            <MdOutlineQuestionAnswer className='icon iconaComentari' /> Respon
          </button>
        </div>
          {renderComentaris(comentaris, c.id, nivell + 1)}

        </div>
      ));
  };

  return (
    <div className="comentaris">
      <div className='Titols'>
        <h3 className='titolComentaris'>Comentaris</h3>
        <div className="underline blanc"></div>
      </div>
      {comentaris.length === 0 ? (
        <p>No hi ha comentaris encara.</p>
      ) : renderComentaris(comentaris)}

      <ComentarisForm
        articleId={articleId}
        respostaA={respostaA}
        onComentariPublicat={() => {
          carregarComentaris();
          setRespostaA(null);
        }}
        cancelResposta={() => setRespostaA(null)}
      />
    </div>
  );
}

export default Comentaris;
