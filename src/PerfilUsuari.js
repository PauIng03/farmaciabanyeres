import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import "./Estils/DemanarCita.css";

function PerfilUsuari() {
  const [usuari, setUsuari] = useState(null);
  const [perfil, setPerfil] = useState({
    nom: '',
    cognom: '',
    telefon: '',
  });
  const [novaContrasenya, setNovaContrasenya] = useState('');
  const [loading, setLoading] = useState(true);
  const [missatgePerfil, setMissatgePerfil] = useState('');
  const [missatgeContrasenya, setMissatgeContrasenya] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const comprovaSessio = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session || !session.user) {
        navigate('/inicisessio');
        return;
      }

      setUsuari(session.user);

      const { data, error } = await supabase
        .from('Perfils')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error carregant perfil:', error.message);
      } else {
        setPerfil(data);
      }

      setLoading(false);
    };

    comprovaSessio();
  }, [navigate]);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleUpdatePerfil = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('Perfils')
      .update(perfil)
      .eq('user_id', usuari.id);

    if (error) {
      setMissatgePerfil("Error actualitzant les dades");
    } else {
      setMissatgePerfil("Perfil actualitzat correctament");
    }
  };

  const handleCanviContrasenya = async (e) => {
    e.preventDefault();

    if (novaContrasenya.length < 6) {
      setMissatgeContrasenya("La contrasenya ha de tenir almenys 6 caràcters.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: novaContrasenya });

    if (error) {
      setMissatgeContrasenya("Error canviant la contrasenya");
    } else {
      setMissatgeContrasenya("Contrasenya actualitzada correctament");
      setNovaContrasenya('');
    }
  };

  if (loading) return <div className="demanarCita"><p>Carregant...</p></div>;

  return (
    <div className="demanarCita">
      <div className="divSuperiorSessio">
        <h3 className="titolDetall">El meu perfil</h3>
        <p>Consulta i edita la teva informació</p>
      </div>

      <form className="formDemanarCita" onSubmit={handleUpdatePerfil}>
        <div className="divsForm">
          <p className="textInput">Nom</p>
          <input type="text" name="nom" value={perfil.nom} onChange={handleChange} />
        </div>
        <div className="divsForm">
          <p className="textInput">Cognom</p>
          <input type="text" name="cognom" value={perfil.cognom} onChange={handleChange} />
        </div>
        <div className="divsForm">
          <p className="textInput">Telèfon</p>
          <input type="tel" name="telefon" value={perfil.telefon} onChange={handleChange} />
        </div>

        <button className="Boto" type="submit">Actualitza perfil</button>
        {missatgePerfil && <p className="missatgeEnviat">{missatgePerfil}</p>}
      </form>

      <form className="formDemanarCita" onSubmit={handleCanviContrasenya}>
        <div className="divsForm">
          <p className="textInput">Nova contrasenya</p>
          <input
            type="password"
            name="novaContrasenya"
            value={novaContrasenya}
            onChange={(e) => setNovaContrasenya(e.target.value)}
            placeholder="Introdueix nova contrasenya"
          />
        </div>
        <button className="Boto" type="submit">Canvia contrasenya</button>
        {missatgeContrasenya && <p className="missatgeEnviat">{missatgeContrasenya}</p>}
      </form>
    </div>
  );
}

export default PerfilUsuari;
