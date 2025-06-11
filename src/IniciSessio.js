import React, { useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

function IniciSessio() {
  const [formData, setFormData] = useState({ email: '', contrassenya: '' });
  const [errors, setErrors] = useState({});
  const [enviat, setEnviat] = useState(false);
  const navigate = useNavigate();

  // Funció per gestionar el canvi en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' }); 
  };

  // Funció per validar el formulari
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Introdueix un correu vàlid";
    if (!formData.contrassenya) newErrors.contrassenya = "Introdueix la contrassenya";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.contrassenya,
    });

    if (error) {
        console.error("Error d'autenticació:", error.message);

        if (error.message.toLowerCase().includes("email not confirmed") || 
            error.message.toLowerCase().includes("not verified")) {
        setErrors({ general: "Verifica el teu compte al teu correu" });
        } else if (error.message.includes("Invalid login credentials")) {
        setErrors({ general: "Email o contrasenya incorrectes" });
        } else {
        setErrors({ general: "Error inesperat: " + error.message });
        }

        setEnviat(false);
    } else {
        setEnviat(true);
        setErrors({});
        console.log("Usuari autenticat:", data.user);
        navigate('/');
        window.location.reload();
    }
  };

  return (
    <div className='demanarCita'>
      <div className="divSuperiorDemanarCita">
        <h3 className="titolDetall">Ja tens Compte?</h3>
        <p>Inicia la sessió amb el correu electrònic</p>
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
          <p className="textInput">Contrassenya</p>
          <input
            type="password"
            name="contrassenya"
            placeholder="Contrassenya"
            value={formData.contrassenya}
            onChange={handleChange}
          />
          {errors.contrassenya && <span className="error">{errors.contrassenya}</span>}
        </div>

        {errors.general && <span className="error">{errors.general}</span>}

        <button className="Boto" type="submit">
          Accedir
        </button>

        {enviat && <p className="missatgeEnviat">Sessió iniciada amb èxit</p>}
      </form>
        <p>
            Encara no tens compte? <Link to="/registre">Registra't</Link>
        </p>
        <p>
        <Link to="/inicisessio/oblidatcontrassenya" className="enlace">
            Has oblidat la contrassenya?
        </Link>
        </p>
    </div>
  );
}

export default IniciSessio;
