import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export default function Articles({ articles, photos, handleToggleComments }) {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: '20px', width: '80%', maxWidth: '100%' }}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 10px 20px',
            }}
            >
            <CardActionArea>
              <CardMedia component="img" height="400" image={photos[index].url} alt="Article Photo" />
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
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  handleToggleComments(index);
                  fetchComments();
              }}
            >
              {article.showComments ? <ArrowUpward /> : <ArrowDownward />}
              {article.showComments ? 'Hide Comments' : 'View Comments'}
              </Button>
            </CardActions>
            {article.showComments && (
              <CardContent
                sx={{
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                {comments
                  .filter(comment => comment.postId === article.id)
                  .map(comment => (
                    <div key={comment.id}>
                      <h3>Comment by: {comment.name}</h3>
                      <p>{comment.body}</p>
                    </div>
                  ))}
              </CardContent>
            )}
          </Card>
        </div>
      ))}
    <div/>
  </div>
  );
}
