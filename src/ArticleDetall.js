import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import './Estils/ArticleDetall.css';
import { useNavigate } from 'react-router-dom';

function ArticleDetall() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from('Articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        navigate('/blog');
      } 
      else setArticle(data);
    }

    fetchArticle();
  }, [id, navigate]);

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
        <p className='autorArticle'>Autora: {article.Autor}</p>
        <p className="dataText">{formatData(article.Data)}</p>
      </div>

        <div className='cos'>
          <div className='cosArticleText' dangerouslySetInnerHTML={{ __html: article.Cos }} />
        </div>
    </div>
  );
}

export default ArticleDetall;
