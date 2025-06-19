import React, { useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import "./Estils/Sessio.css"

function Registre() {
  const [formData, setFormData] = useState({
    email: '',
    contrasenya: '',
    nom: '',
    cognom: '',
    telefon: '',
  });

  const [errors, setErrors] = useState({});
  const [enviat, setEnviat] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Introdueix un correu vàlid";
    if (!formData.contrasenya) newErrors.contrasenya = "Introdueix una contrasenya";
    if (!formData.nom) newErrors.nom = "Introdueix el teu nom";
    if (!formData.cognom) newErrors.cognom = "Introdueix el teu cognom";
    if (!formData.telefon) newErrors.telefon = "Introdueix el teu telèfon";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.contrasenya,
    });

    if (signUpError) {
      setErrors({ general: signUpError.message });
      return;
    }

    const user = signUpData.user;

    if (user) {
      const { error: insertError } = await supabase.from('Perfils').insert([
        {
          user_id: user.id,
          nom: formData.nom,
          cognom: formData.cognom,
          telefon: formData.telefon,
        },
      ]);

      if (insertError) {
        console.error('Error inserint perfil:', insertError.message);
        setErrors({ general: 'Error guardant el perfil' });
      } else {
        setEnviat(true);
        setErrors({});
        setTimeout(() => navigate('/inicisessio'), 1500);
      }
    }
  };

  return (
    <div className='demanarCita'>
      <div className="divSuperiorSessio">
        <h3 className="titolDetall">Crea un compte</h3>
        <p>Introdueix les teves dades per registrar-te</p>
      </div>

      <form className='formDemanarCita' onSubmit={handleSubmit}>
        <div className="divsForm">
          <p className="textInput">Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="divsForm">
          <p className="textInput">Contrasenya</p>
          <input
            type="password"
            name="contrasenya"
            placeholder="Contrasenya"
            value={formData.contrasenya}
            onChange={handleChange}
          />
          {errors.contrasenya && <span className="error">{errors.contrasenya}</span>}
        </div>

        <div className="divsForm">
          <p className="textInput">Nom</p>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
          />
          {errors.nom && <span className="error">{errors.nom}</span>}
        </div>

        <div className="divsForm">
          <p className="textInput">Cognom</p>
          <input
            type="text"
            name="cognom"
            placeholder="Cognom"
            value={formData.cognom}
            onChange={handleChange}
          />
          {errors.cognom && <span className="error">{errors.cognom}</span>}
        </div>

        <div className="divsForm">
          <p className="textInput">Telèfon</p>
          <input
            type="tel"
            name="telefon"
            placeholder="Telèfon"
            value={formData.telefon}
            onChange={handleChange}
          />
          {errors.telefon && <span className="error">{errors.telefon}</span>}
        </div>

        {errors.general && <span className="error">{errors.general}</span>}

        <button className="Boto" type="submit">Registrar-se</button>

        {enviat && <p className="missatgeEnviat">Registre complet!</p>}
      </form>
    </div>
  );
}

export default Registre;
