import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

function ComentarisForm({ articleId, respostaA = null, onComentariPublicat, cancelResposta }) {
  const [usuariId, setUsuariId] = useState(null);
  const [comentari, setComentari] = useState('');
  const [error, setError] = useState('');
  const [enviat, setEnviat] = useState(false);

  useEffect(() => {
    async function obtenirUsuari() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error obtenint sessió:", error.message);
        return;
      }
      const user = session?.user;
      if (user) {
        setUsuariId(user.id);
      }
    }

    obtenirUsuari();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEnviat(false);

    if (!comentari.trim()) {
      setError("Has d'escriure un comentari.");
      return;
    }

    if (!usuariId) {
      setError("Has d'estar registrat per comentar.");
      return;
    }

    const { error } = await supabase.from('Comentaris').insert([{
      article_id: articleId,
      usuari_id: usuariId,
      comentari: comentari.trim(),
      resposta_a: respostaA
    }]);

    if (error) {
      console.error("Error afegint comentari:", error.message);
      setError("No s'ha pogut publicar el comentari.");
    } else {
      setComentari('');
      setEnviat(true);
      if (onComentariPublicat) onComentariPublicat();
    }
  };

  if (!usuariId) return null;

  return (
    <div className='divFormulariComentari'>
      <p className='titolPComentari'>
        {respostaA ? "Responent a un comentari..." : "Afegeix un comentari"}
      </p>
      <form onSubmit={handleSubmit} className="formulariComentari">
        <textarea className='textareaComentaris'
          value={comentari}
          onChange={(e) => setComentari(e.target.value)}
          placeholder="Escriu el teu comentari..."
          rows={4}
        />
        {error && <p className="error">{error}</p>}
        {enviat && <p className="missatgeEnviat">Comentari publicat!</p>}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className='Boto blanc' type="submit">Publicar</button>
          {respostaA && (
            <button type="button" onClick={cancelResposta} className="Boto blanc">Cancel·la</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ComentarisForm;
