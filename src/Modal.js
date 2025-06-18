import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Estils/Inici.css'

function Modal({ missatge }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div style={{
      position: 'fixed', top:0, left:0, width:'100vw', height:'100vh',
      backgroundColor:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center',
      zIndex: 1000,
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 10, maxWidth: 400, textAlign: 'center' }}>
        <p>{missatge}</p>
        <button className='Boto' onClick={handleClose}>Tornar a inici</button>
      </div>
    </div>
  );
}

export default Modal;