import LlistatPromocions from "./LlistatPromocions";

function Promocions() {
  return (
    <div>
      <div className="banner">
        <img src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Imatge banner" className="imatgeBanner" />
        <div className="overlayNegre"></div>
        <div className="contingutBanner">
          <h1 className="titolBanner">Promocions</h1>
        </div>
      </div>
    <LlistatPromocions></LlistatPromocions>
    </div>

  );
}

export default Promocions;