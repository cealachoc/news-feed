import React, { useState, useEffect } from 'react';
import './Styles/Feed.css';
import CircularProgress from '@mui/joy/CircularProgress';
import Articles from './Articles';
import Sidebar from './Sidebar';

export default function Feed({ articles, photos, comments, setArticles }) {
  const articlesPerPage = 10;
  const [visibleArticles, setVisibleArticles] = useState(articles.slice(0, articlesPerPage));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVisibleArticles(articles.slice(0, articlesPerPage));
  }, [articles]);

  const handleToggleComments = (articleIndex) => {
    const updatedArticles = articles.map((article, index) => {
      if (index === articleIndex) {
        return {
          ...article,
          showComments: !article.showComments
        };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (documentHeight - (windowHeight + scrollTop) < 100) {
      setIsLoading(true);
      const startIndex = visibleArticles.length;
      const endIndex = startIndex + articlesPerPage;
      setVisibleArticles([...visibleArticles, ...articles.slice(startIndex, endIndex)]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <h1>News feed</h1>
      <Articles
        articles={visibleArticles}
        photos={photos}
        comments={comments}
        handleToggleComments={handleToggleComments}
      />
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress variant="soft" color="neutral" />
        </div>
      )}
    </div>
  );
}
