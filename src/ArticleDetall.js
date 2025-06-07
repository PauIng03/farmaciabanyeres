import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import './Estils/ArticleDetall.css';

function ArticleDetall() {
  const { id } = useParams(); // l'id que ve de la URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from('Articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('Error carregant article:', error.message);
      else setArticle(data);
    }

    fetchArticle();
  }, [id]);

  function formatData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.toLocaleString('ca-ES', { month: 'long' });
    const any = data.getFullYear();
    return `${dia} de ${mes} de ${any}`;
  }

  if (!article) return <p>Carregant article...</p>;

  return (
    <div className="articles">
      <div className='Titols'>
        <h1>{article.Nom}</h1>
        <div className="underline"></div>
      </div>

      <div className="articleDetall">
        <p className='autorArticle'>{article.Autor}</p>
        <p className="dataText">{formatData(article.Data)}</p>
      </div>

        <div className='cos'>
          <p className='cosArticle'>Negreta</p>
          <p className='cosArticleText'>{article.Cos}</p>
        </div>

        <div className='contingut'>
          <p className='contingutArticle'>{article.Comentaris}</p>
        </div>
    </div>
  );
}

export default ArticleDetall;
