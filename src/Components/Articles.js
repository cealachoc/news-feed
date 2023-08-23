import React from 'react';
import Article from './Article';

export default function Articles({ articles, photos}) {

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

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