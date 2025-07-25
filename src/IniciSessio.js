import React, { useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import "./Estils/Sessio.css"

function IniciSessio() {
  const [formData, setFormData] = useState({ email: '', contrasenya: '' });
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
    if (!formData.contrasenya) newErrors.contrasenya = "Introdueix la contrasenya";
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
        password: formData.contrasenya,
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
      <div className="divSuperiorSessio">
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

        {errors.general && <span className="error">{errors.general}</span>}

        <button className="Boto" type="submit">
          Accedir
        </button>

        {enviat && <p className="missatgeEnviat">Sessió iniciada amb èxit</p>}
      </form>
        <p>
            Encara no tens compte? <Link className='enllaços' to="/registre">Registra't</Link>
        </p>
        <p>
        <Link to="/inicisessio/oblidatcontrasenya" className='enllaços'>
            Has oblidat la contrasenya?
        </Link>
        </p>
    </div>
  );
}

export default IniciSessio;
