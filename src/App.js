import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import QuiSom from './QuiSom.js';
import Serveis from './Serveis.js'
import Blog from './Blog.js'
import Promocions from './Promocions.js'
import Footer from './Footer.js'
import Inici from './Inici.js';
import Assessorament from './Assessorament.js';
import ArticleIndividual from './ArticleIndividual.js';
import Contacte from './Contacte.js';
import ServeisVistaInterior from './ServeisVistaInterior.js';
import AssessoramentVistaInterior from './AssessoramentVistaInterior.js';
import DemanarCita from './DemanarCita.js';

function App() {
  return (

    <BrowserRouter className="inici-desktop-1">
      <Header />
      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/qui-som" element={<QuiSom />} />
        <Route path="/serveis" element={<Serveis />} />
        <Route path='/serveis/:id' element={<ServeisVistaInterior/>}></Route>
        <Route path='/serveis/:id/demanar-cita' element={<DemanarCita/>}></Route>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticleIndividual />} />
        <Route path="/promocions" element={<Promocions />} />
        <Route path="/assessorament" element={<Assessorament />} />
        <Route path='/assessorament/:id' element={<AssessoramentVistaInterior/>}></Route>
        <Route path='/assessorament/:id/demanar-cita' element={<DemanarCita/>}></Route>
        <Route path="/contacte" element={<Contacte />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
