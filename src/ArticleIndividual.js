import React from 'react';
import './Estils/Blog.css';
import ArticleDetall from './ArticleDetall';
import ArticlesBlog from './ArticlesBlog';
import { useParams } from 'react-router-dom';

function ArticleIndividual() {
  const { id } = useParams();

  return (
    <div className="Blog">
      <ArticleDetall></ArticleDetall>
      <ArticlesBlog title="Altres articles" limit={3} excludeId={parseInt(id)} smallTitle={true} articlesRecomanats={true}/>
    </div>
  );
}

export default ArticleIndividual;