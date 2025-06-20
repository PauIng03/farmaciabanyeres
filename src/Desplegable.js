import React, { useState } from 'react';

function Desplegable({ pregunta, resposta }) {
  const [obert, setObert] = useState(false);

  return (
    <div className="divDesplegable" onClick={() => setObert(!obert)}>
      <div className="preguntaWrapper">
        <p className="pregunta">{pregunta}</p>
        <span className={`fletxa ${obert ? 'oberta' : ''}`}>▼</span>
      </div>
      {obert && <p className="resposta" dangerouslySetInnerHTML={{ __html: resposta }} />}
    </div>
  );
}
export default Desplegable