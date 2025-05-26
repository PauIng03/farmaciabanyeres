import React from 'react';
import Header from './Header.js';
import QuiSom from './QuiSom.js';
import Serveis from './Serveis.js'
import Blog from './Blog.js'
import Promocions from './Promocions.js'
import Footer from './Footer.js'

function App() {
  return (
    <div className="inici-desktop-1">
      <Header />
      <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
      <QuiSom />
      <Serveis />
      <Blog />
      <Promocions />
      <Footer />
    </div>
  );
}

export default App;
