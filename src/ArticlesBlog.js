import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import './Estils/Blog.css';

function ArticlesBlog({
  title = "Articles",
  underlineClass = "underline",
  limit = null,
  showButton = false,
  showReadMore = true,
  excludeId = null,
  smallTitle = false,
  articlesRecomanats = false,
  articleindividual = "articleIndividual"
}) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      let query = supabase.from('Articles').select('*');
      const { data, error } = await query;

      if (error) {
        console.error('Error carregant articles:', error.message);
      } else {
        let filteredData = data;

        if (excludeId) {
          filteredData = filteredData.filter(article => article.id !== excludeId);
        }

        if (limit) {
          filteredData = filteredData.slice(0, limit);
        }

        setArticles(filteredData);
      }
    }

    fetchArticles();
  }, [limit, excludeId]);

  function formatData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.toLocaleString('ca-ES', { month: 'short' });
    const mesCapitalitzat = mes.charAt(0).toUpperCase() + mes.slice(1);

    return (
      <div className="Data">
        <p className="Dia">{dia}</p>
        <p className="Mes">{mesCapitalitzat}</p>
      </div>
    );
  }

  return (
    <div className={`articles ${articlesRecomanats ? 'articlesRecomanats' : ''}`}>
      <div className='Titols'>
        <h1 className={`titolArticle ${smallTitle ? 'titolArticlePetit' : ''}`}>{title}</h1>
        <div className={underlineClass}></div>
      </div>

      <div className="articlesBlog">
        {articles.map((article) => (
          <div key={article.id} className='articleBoto'>
            <div
              className={articleindividual}
              onClick={() => navigate(`/blog/${article.id}`)}
              style={{
                backgroundImage: `url(${article.Imatge})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className='DivDataCategoria'>
                <div className='data'>
                  {formatData(article.Data)}
                </div>
                <div className='categoria'>
                  <p className='categoriaText'>{article.Categoria}</p>
                </div>
              </div>
              <div className='InfoArticle'>
                <p className='nomArticle'>{article.Nom}</p>
                <div className='autor'>
                  <FaUser className="iconaUsuari" />
                  <p className='autorArticle'>{article.Autor}</p>
                </div>
                <div className='resum'>
                  <p className='resumArticleText'>{article.Resum}</p>
                </div>
              </div>
            </div>

            {showReadMore && (
              <button className='BotoArticle' onClick={() => navigate(`/blog/${article.id}`)}>Continua llegint</button>
            )}
          </div>
        ))}
      </div>

      {showButton && (
        <div className="containerBotoFinal">
          <button className="Boto BotoVoraBlanca" onClick={() => navigate('/blog')}>Veure'n més</button>
        </div>
      )}
    </div>
  );
}

export default ArticlesBlog;
