import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

function ArticlesBlog({ underlineClass="underline", limit = null}) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      let query = supabase.from('Articles').select('*');
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.error('Error carregant articles:', error.message);
      } else {
        setArticles(data);
      }
    }
    fetchArticles();
  }, [limit]);

  return (
    <div className="articles">
      <div className='Titols'>
        <h1>Blog</h1>
        <div className={underlineClass}></div>
      </div>

      <div className="articlesBlog">
        {articles.map((article) => (
          <div key={article.id} className='articleBoto'>
            <div className='articleIndividual'>
                <div className='DivDataCategoria'>
                    <div className='data'>
                        <p className='dataText'>{article.Data}</p>
                    </div>
                    <div className='categoria'>
                        <p className='categoriaText'>{article.Categoria}</p>
                    </div>
                </div>
                <div className='InfoArticle'>
                    <p className='nomArticle'>{article.Nom}</p>
                    <p className='autorArticle'>{article.Autor}</p>
                    <p className='resumArticle'>Resum:<br></br>{article.Resum}</p>
                </div>
            </div>
            <button className='BotoRosa' onClick={() => navigate(`/blog/${article.Nom}`)}>Continua llegint</button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesBlog;
