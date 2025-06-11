import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import emailjs from '@emailjs/browser';
import "./Estils/DemanarCita.css";

function DemanarCita() {
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

  // Form data incloent nom, email, telefon carregats automàticament
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telefon: '',
    missatge: '',
    servei: '',
    contacte: '',
    horari: '',
  });

  const form = useRef();

  useEffect(() => {
    if (location.pathname.startsWith('/assessorament/')) {
      setTaula('Assessoraments');
      setfrase('Assesorament escollit');
      setEstilBoto('BotoCitaAssessorament');
      setEstilMargeForm('llistaDemanarCitaAssessorament');
    } else if (location.pathname.startsWith('/serveis/')) {
      setTaula('Serveis');
      setfrase('Servei escollit');
      setEstilBoto('BotoCitaServeis');
      setEstilMargeForm('llistaDemanarCitaServeis');
    } else {
      setTaula(null);
      setfrase(null);
      setEstilBoto(null);
    }
  }, [location.pathname]);

  // Carregar llista de serveis o assessoraments
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

  // Seleccionar servei segons id de la URL o per defecte primer de la llista
  useEffect(() => {
    if (!taula || !id || llista.length === 0) return;

    const servei = llista.find((item) => item.id === Number(id));
    if (servei) {
      setServeiSeleccionat(servei);
    } else {
      setServeiSeleccionat(llista[0]);
    }
  }, [taula, id, llista]);

  // Quan canviï el serveiSeleccionat, actualitza el formData.servei
  useEffect(() => {
    if (serveiSeleccionat) {
      setFormData((prev) => ({ ...prev, servei: serveiSeleccionat.Nom }));
    }
  }, [serveiSeleccionat]);

  // Carregar dades usuari de Supabase (nom, email, telefon) si hi ha sessió
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

  if (!formData.contacte || String(formData.contacte).trim() === '') newErrors.contacte = "Escollir una via de contacte és obligatori.";

  if (!formData.horari || String(formData.horari).trim() === '') newErrors.horari = "Escollir una franja horaria és obligatori.";

  return newErrors;
};


  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current,
        'YOUR_PUBLIC_KEY'
      )
      .then(() => {
        setEnviat(true);
        form.current.reset();
        setFormData({ nom: '', email: '', telefon: '', missatge: '', servei: '', contacte: '', horari: '' });
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
        <h3 className="titolDetall">Demanar cita</h3>
        <p>
          Omple el formulari per demanar cita. Estarem encantats d’ajudar-te! Et
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

        <div className="desplegableDemanarCita">
          <p className="textInput">Via de contacte desitjada</p>
          <select
            className={estilMargeForm}
            name="contacte"
            value={formData.contacte}
            onChange={handleChange}
          >
            <option value="">-- Selecciona una opció --</option>
            <option value="Telèfon">Telèfon</option>
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          {errors.contacte && <span className="error">{errors.contacte}</span>}
        </div>

        <div className="desplegableDemanarCita">
          <p className="textInput">Horari preferent</p>
          <select
            className={estilMargeForm}
            name="horari"
            value={formData.horari}
            onChange={handleChange}
            >
            <option value="">-- Selecciona una franja --</option>
            <option value="Dilluns a Divendres - Matí">Dilluns a Divendres - Matí</option>
            <option value="Dilluns a Divendres - Tarda">Dilluns a Divendres - Tarda</option>
            <option value="Dissabtes - Matí">Dissabtes - Matí</option>
            </select>
            {errors.horari && <span className="error">{errors.horari}</span>}
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

        <button
          className={estilBoto}
          type="submit"
        >
          Demana cita
        </button>

        {enviat && <p className="missatgeEnviat">Missatge enviat correctament!</p>}
      </form>
    </div>
  );
}

export default DemanarCita;
