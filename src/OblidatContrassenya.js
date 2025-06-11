import React, { useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { Link } from 'react-router-dom';
import "./Estils/Sessio.css"

function OblidatContrassenya() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [enviat, setEnviat] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEnviat(false);

    if (!email) {
      setError("Introdueix un correu vàlid");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://farmaciabanyeres.com/reset-password',
    });

    if (error) {
      setError("No s'ha pogut enviar el correu de recuperació: " + error.message);
    } else {
      setEnviat(true);
    }
  };

  return (
    <div className='demanarCita'>
      <div className="divSuperiorSessio">
        <h3 className="titolDetall">Has oblidat la contrasenya?</h3>
        <p>Introdueix el teu correu per rebre un enllaç de recuperació</p>
      </div>

      <form className='formDemanarCita' onSubmit={handleSubmit}>
        <div className="divsForm">
          <p className="textInput">Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error">{error}</span>}
        </div>

        <button className="Boto" type="submit">
          Envia l'enllaç
        </button>

        {enviat && <p className="missatgeEnviat">Comprova el teu correu per restablir la contrasenya</p>}
      </form>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/inicisessio">Tornar a iniciar sessió</Link>
      </p>
    </div>
  );
}

export default OblidatContrassenya;
