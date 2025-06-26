import './Estils/QuiSom.css';
import { useNavigate } from 'react-router-dom';

function DivQuiSom({ botoText, botoRuta}) {
    const navigate = useNavigate();

    return (
        <div className="QuiSom">
          <div className='Titols'>
            <h1>Qui som?</h1>
            <div className='underline'></div>
          </div>
          <div className="TextImatgeQuiSom">
            <div className='TextBoto'>
              <p className='TextQuiSom'>
                <b>Farmàcia Banyeres és un espai de salut on tu ets el centre.</b><br /><br />
                Oferim una atenció personalitzada, professional, actualitzada i adaptada a cada pacient.<br />
                La nostra motivació són els nostres pacients i tenir cura de la seva salut.<br />
                Comptem amb un equip qualificat, competent, proper i de confiança que es forma de manera continuada per oferir la millor atenció.
              </p>
              <button className='BotoQuiSom' onClick={() => navigate(botoRuta)}>{botoText}</button>
            </div>
            <img className='Imatge' src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-serveis-assessorament//QuiSom.jpeg" alt="QuiSom" />
          </div>
        </div>
    )
};
export default DivQuiSom;
