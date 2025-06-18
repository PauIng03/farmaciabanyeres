import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import QuiSom from './QuiSom.js';
import Serveis from './Serveis.js'
import Blog from './Blog.js'
import Promocions from './Promocions.js'
import PromocioDetall from './PromocionsVistaInterior.js';
import Footer from './Footer.js'
import Inici from './Inici.js';
import Assessorament from './Assessorament.js';
import ArticleIndividual from './ArticleIndividual.js';
import Contacte from './Contacte.js';
import ServeisVistaInterior from './ServeisVistaInterior.js';
import AssessoramentVistaInterior from './AssessoramentVistaInterior.js';
import DemanarCita from './DemanarCita.js';
import IniciSessio from './IniciSessio.js';
import OblidatContrassenya from './OblidatContrassenya.js';
import Registre from './Registre.js';
import BotoFlotant from './BotoFlotant.js';
import PerfilUsuari from './PerfilUsuari.js';
import Encarrecs from './Encarrecs.js';
import "./App.css"

function App() {
  return (
    <BrowserRouter className="inici-desktop-1">
      <Header />
      <div className="ContingutApp">
        <Routes>
          <Route path="/" element={<Inici />} />
          <Route path="/qui-som" element={<QuiSom />} />
          <Route path="/serveis" element={<Serveis />} />
          <Route path='/serveis/:id' element={<ServeisVistaInterior/>}></Route>
          <Route path='/serveis/:id/demanar-cita' element={<DemanarCita/>}></Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleIndividual />} />
          <Route path="/promocions" element={<Promocions />} />
          <Route path="/promocions/:id" element={<PromocioDetall />} />
          <Route path="/promocions/:id/encarrec" element={<Encarrecs />} />
          <Route path="/assessorament" element={<Assessorament />} />
          <Route path='/assessorament/:id' element={<AssessoramentVistaInterior/>}></Route>
          <Route path='/assessorament/:id/demanar-cita' element={<DemanarCita/>}></Route>
          <Route path="/contacte" element={<Contacte />} />
          <Route path='/inicisessio' element={<IniciSessio />}></Route>
          <Route path='/inicisessio/oblidatcontrassenya' element={<OblidatContrassenya />}></Route>
          <Route path='/registre' element={<Registre />}></Route>
          <Route path='/usuari' element={<PerfilUsuari />}></Route>
        </Routes>
      </div>
      <BotoFlotant />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
