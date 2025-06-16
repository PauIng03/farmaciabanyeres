import React, { useRef, useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import emailjs from 'emailjs-com';
import Maps from "./Maps";
import "./Estils/Contacte.css"

function Contacte() {
  const form = useRef();
  const [formData, setFormData] = useState({
      nom: '',
      email: '',
      telefon: '',
      missatge: ''
  });

  const [errors, setErrors] = useState({});
  const [enviat, setEnviat] = useState(false);

  useEffect(() => {
    async function carregarDadesUsuari() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userEmail = session.user.email;

        let nomComplet = '';
        let telefonUsuari = '';

        const { data: perfils, error } = await supabase
          .from('Perfils')
          .select('nom, cognom, telefon')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.log('Error carregant perfil:', error.message);
        } else if (perfils) {
          nomComplet = perfils.nom + ' ' + perfils.cognom;
          telefonUsuari = perfils.telefon ? perfils.telefon.toString() : '';
        }

        setFormData(prev => ({
          ...prev,
          nom: nomComplet,
          email: userEmail || '',
          telefon: telefonUsuari
        }));
      }
    }

    carregarDadesUsuari();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "El nom és obligatori.";
    if (!formData.email.trim()) {
      newErrors.email = "L'email és obligatori.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invàlid.";
    }
    if (!formData.missatge.trim()) newErrors.missatge = "El missatge és obligatori.";
    return newErrors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      form.current,
      'YOUR_PUBLIC_KEY'
    ).then(() => {
      setEnviat(true);
      form.current.reset();
      setFormData({ nom: '', email: '', telefon: '', missatge: '' });
    }).catch((error) => {
      console.error("Error en l'enviament:", error.text);
      alert("Hi ha hagut un error en enviar el missatge.");
    });
  };

    return (
        <div className='contacte'>
            <div className='Titols'>
                <h1>Contacte</h1>
                <div className="underline"></div>
            </div>
            <div className='contingutInfo'>
                <div className="infoContacte">
                    <div className='divTitolInfo'>
                        <h3 className='subtitol'>Consultes, Idees, Suggeriments</h3>
                        <h2 className='h2Contacte VolemSaberDeTu'>Volem saber de tu</h2>
                        <div className="underline"></div>
                    </div>
                    <div className='divInfo'>
                        <p className='titolsNegreta'>Farmàcia Banyeres</p>
                        <div>
                            <p className='textCosContacte'>Plaça Onze de Setembre, s/n</p>
                            <p className='textCosContacte'>4371 Banyeres del Penedès, Tarragona</p>
                        </div>
                        <div>
                            <p className='textCosContacte'>Telef: 977 67 11 02</p>
                            <p className='textCosContacte'>Email: info@farmaciabanyeres.com</p>
                        </div>
                    </div>
                    <div className='divHorari'>
                        <p className='titolsNegreta'>Horari</p>
                        <div>
                            <p className='textCosContacte'>De dilluns a divendres de 8:00h a 20:00h</p>
                            <p className='textCosContacte'>Dissabtes de 9:00h a 14:00h</p>
                        </div>    
                    </div>
                </div>
                 <form className="formContacte" ref={form} onSubmit={sendEmail} noValidate>
        <div className='divsForm'>
          <p className='textInputContacte'>Nom</p>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
          />
          {errors.nom && <span className="error">{errors.nom}</span>}
        </div>
        
        <div className='divsForm'>
          <p className='textInputContacte'>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className='divsForm'>
          <p className='textInputContacte'>Telèfon</p>
          <input
            type="tel"
            name="telefon"
            placeholder="Telèfon"
            value={formData.telefon}
            onChange={handleChange}
          />
        </div>

        <div className='divsForm'>
          <p className='textInputContacte'>Missatge</p>
          <textarea
            name="missatge"
            placeholder="Missatge"
            rows="4"
            value={formData.missatge}
            onChange={handleChange}
          ></textarea>
          {errors.missatge && <span className="error">{errors.missatge}</span>}
        </div>


        <button className='BotoFormContacte' type="submit">Enviar</button>
        {enviat && <p className="missatgeEnviat">Missatge enviat correctament!</p>}
      </form>
        <div className='ContenidorLila'></div>
        <div className='divMaps'>
          <div className='divTitolLocalitzacio'>
            <h2 className='h2Contacte'>Localització</h2>
            <div className="underline"></div>
          </div>
        <Maps />
        </div>
      </div>
    </div>
  );
}

export default Contacte;