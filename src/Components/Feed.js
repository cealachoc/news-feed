import * as React from 'react';
import './Styles/Feed.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Feed({ articles, photos, comments, setArticles }) {
  const cardsPerRow = 3;

  const rows = [];
  for (let i = 0; i < articles.length; i += cardsPerRow) {
    const row = articles.slice(i, i + cardsPerRow);
    rows.push(row);
  }

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
  }

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
      {rows.map((row, rowIndex) => (
        <div
        key={rowIndex}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
        >
          {row.map((article, columnIndex) => {
            const photo = photos[columnIndex];
            const articleComments = comments.filter(comment => comment.postId === article.id);
            return (
            <Card
              key={columnIndex}
              sx={{ maxWidth: 300, width: '100%', marginRight: '20px' }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.url}
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
                <Button size="small" color="primary" onClick={() => handleToggleComments(columnIndex)}>
                  {article.showComments ? 'Hide Comments' : 'View Comments'}
                </Button>
              </CardActions>
              {article.showComments && (
                <CardContent>
              {articleComments.map(comment => (
                <div key={comment.id}>
                  <h3>Comment by {comment.name}</h3>
                  <p>{comment.body}</p>
                </div>
              ))}
              </CardContent>
            )}
            </Card>
)})}
        </div>
      ))}
    </div>
  );
}
