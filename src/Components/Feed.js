import * as React from 'react';
import './Styles/Feed.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';

export default function Feed({ articles, photos, comments, setArticles }) {
  const articlesPerPage = 10;
  const [visibleArticles, setVisibleArticles] = React.useState(articles.slice(0, articlesPerPage));
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleArticles]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1>News feed</h1>
      {visibleArticles.map((article, index) => (
        <div
          key={index}
          style={{
            marginBottom: '20px',
          }}
        >
          <Card
            sx={{ maxWidth: 300, width: '100%' }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={photos[index].url}
                alt="Article Photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleToggleComments(index)}>
                {article.showComments ? 'Hide Comments' : 'View Comments'}
              </Button>
            </CardActions>
            {article.showComments && (
              <CardContent>
                {comments
                  .filter(comment => comment.postId === article.id)
                  .map(comment => (
                    <div key={comment.id}>
                      <h3>Comment by {comment.name}</h3>
                      <p>{comment.body}</p>
                    </div>
                  ))}
              </CardContent>
            )}
          </Card>
        </div>
      ))}

      {isLoading && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} >
          <CircularProgress variant='soft' color='neutral'/>
        </div>
      )}
    </div>
  );
}
