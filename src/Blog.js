import React from 'react';
import './Estils/Blog.css';
import ArticlesBlog from './ArticlesBlog';

function Blog() {
  return (
    <div>
    <div className="banner">
        <img src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Imatge banner" className="imatgeBanner" />
        <div className="overlayNegre"></div>
        <div className="contingutBanner">
          <h1 className="titolBanner">Blog</h1>
        </div>
      </div>
    <div className="Blog">
      <ArticlesBlog></ArticlesBlog>
    </div>
    </div>
  );
}

export default Blog;