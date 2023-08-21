import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Articles({ articles, photos, handleToggleComments }) {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  return (
    <>
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Card sx={{ maxWidth: 300, width: '100%' }}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={photos[index].url} alt="Article Photo" />
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
              <Button size="small" color="primary"
              onClick={() => {handleToggleComments(index);
              fetchComments();
              }}>
                {article.showComments ? 'Hide Comments' : 'View Comments'}
              </Button>
            </CardActions>
            {article.showComments && (
              <CardContent>
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
    </>
  );
}
