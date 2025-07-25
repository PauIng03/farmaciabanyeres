import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import emailjs from '@emailjs/browser';
import "./Estils/DemanarCita.css";
import Modal from './Modal';

function Encarrecs() {
  const { id } = useParams();
  const location = useLocation();
  const [taula, setTaula] = useState(null);
  const [frase, setfrase] = useState([]);
  const [estilBoto, setEstilBoto] = useState([]);
  const [estilMargeForm, setEstilMargeForm] = useState([]);

  const [llista, setLlista] = useState([]);
  const [serveiSeleccionat, setServeiSeleccionat] = useState(null); // El servei seleccionat

  const [errors, setErrors] = useState({});
  const [enviat, setEnviat] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telefon: '',
    missatge: '',
    servei: '',
  });

  const form = useRef();

  useEffect(() => {
    if (location.pathname.startsWith('/promocions/')) {
        setTaula('Promocions');
        setfrase('Promoció escollida');
        setEstilBoto('BotoCitaServeis');
        setEstilMargeForm('llistaDemanarCitaServeis');
    } else {
        setTaula(null);
        setfrase(null);
        setEstilBoto(null);
        setEstilMargeForm(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    async function fetchLlista() {
      if (!taula) return;

      const { data, error } = await supabase
        .from(taula)
        .select('id, Nom')
        .order('Nom', { ascending: true });

      if (error) {
        console.error('Error carregant la llista:', error.message);
      } else {
        setLlista(data);
      }
    }

    fetchLlista();
  }, [taula]);

  useEffect(() => {
    if (!taula || !id || llista.length === 0) return;

    const servei = llista.find((item) => item.id === Number(id));
    if (servei) {
      setServeiSeleccionat(servei);
    } else {
      setServeiSeleccionat(llista[0]);
    }
  }, [taula, id, llista]);

  useEffect(() => {
    if (serveiSeleccionat) {
      setFormData((prev) => ({ ...prev, servei: serveiSeleccionat.Nom }));
    }
  }, [serveiSeleccionat]);

  useEffect(() => {
    async function carregarDadesUsuari() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user = session.user;
        const { data: perfil, error } = await supabase
          .from('Perfils')
          .select('nom, cognom, telefon')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.log("Error carregant perfil:", error.message);
        } else if (perfil) {
          setFormData(prev => ({
            ...prev,
            nom: `${perfil.nom || ''} ${perfil.cognom || ''}`.trim(),
            email: user.email || '',
            telefon: perfil.telefon || ''
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            email: user.email || ''
          }));
        }
      }
    }
    carregarDadesUsuari();
  }, []);

  const handleServeiChange = (e) => {
    const selectedId = Number(e.target.value);
    const servei = llista.find((item) => item.id === selectedId);
    setServeiSeleccionat(servei);
    setFormData((prev) => ({ ...prev, servei: servei ? servei.Nom : '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
  const newErrors = {};
  if (!formData.nom || String(formData.nom).trim() === '') newErrors.nom = "El nom és obligatori.";

  if (!formData.email || String(formData.email).trim() === '') {
    newErrors.email = "L'email és obligatori.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Format d'email invàlid.";
  }

  if (!formData.telefon || String(formData.telefon).trim() === '') newErrors.telefon = "El telèfon és obligatori.";

  return newErrors;
};


  const sendEmail = (e) => {
  e.preventDefault();

  const honeypotValue = form.current?.website?.value;
  if (honeypotValue) {
    console.warn("Bot detectat. Missatge no enviat.");
    return;
  }

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  emailjs
    .sendForm(
      'service_q8wqbi6',
      'template_zpsz1c9',
      form.current,
      'QhTEuFfxlsTIlPD7E'
    )
    .then(() => {
      setEnviat(true);
      form.current.reset();
      setFormData({ nom: '', email: '', telefon: '', missatge: '', servei: '' });
    })
    .catch((error) => {
      console.error("Error en l'enviament:", error.text);
      alert("Hi ha hagut un error en enviar el missatge.");
    });
  };


  if (!taula) return <p>Ruta no vàlida</p>;
  if (llista.length === 0) return <p>Carregant llista...</p>;

  return (
    <div className='demanarCita'>
      <div className="divSuperiorDemanarCita">
        <h3 className="titolDetall">Fer un encàrrec</h3>
        <p>
          Omple el formulari per encarregar el producte. Estarem encantats d’ajudar-te! Et
          respondrem en 24-48h! El nostre horari d’atenció al client és de 8:00h a
          20:00h de dilluns a divendres i de 9:00h a 14:00h els dissabtes.
        </p>
      </div>

      <form className='formDemanarCita' ref={form} onSubmit={sendEmail}>
        <div className="desplegableDemanarCita">
          <p className="textInput">{frase}</p>
          <select
            className={estilMargeForm}
            name="servei"
            value={serveiSeleccionat ? serveiSeleccionat.id : ''}
            onChange={handleServeiChange}
          >
            {llista.map((item) => (
              <option key={item.id} value={item.id}>
                {item.Nom}
              </option>
            ))}
          </select>
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

        <div className="divsForm">
          <p className="textInput">Missatge</p>
          <textarea
            name="missatge"
            placeholder="Missatge (opcional)"
            value={formData.missatge}
            onChange={handleChange}
          />
        </div>
        <input type="hidden" name="servei_nom" value={serveiSeleccionat?.Nom || ''} />
        
        <input type="text" name="website" autoComplete="off" style={{ display: 'none' }} tabIndex="-1" />

        <button
          className={estilBoto}
          type="submit"
        >
          Tramita l'encàrrec
        </button>

        {enviat && <Modal missatge="Missatge enviat correctament!" onClose={() => setEnviat(false)} />}
      </form>
    </div>
  );
}

export default Encarrecs;
