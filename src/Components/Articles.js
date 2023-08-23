import React from 'react';
import Article from './Article';

export default function Articles({ articles, photos, fetchComments}) {


  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {articles.map((article, index) => (
        <Article
          key={index}
          article={article}
          photo={photos[index]}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  )
}