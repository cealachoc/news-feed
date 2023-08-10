import React from 'react';
import './Styles/Feed.css'

const Articles = ({articles}) => {
  return (
    <div className='news-feed'>
      <h1>News Feed</h1>
      <div className='articles'>
        {articles && articles.map((article, index) => (
          <div key={index} className='article'>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Articles;