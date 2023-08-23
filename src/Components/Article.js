import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const Article = ({ article, photo }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${article.id}`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error))
  }

  const toggleShowComments = () => {
    if (!showComments) {
      fetchComments(article.id)
        .then(data => setComments(data))
        .catch(error => console.error('Error fetching comments', error))
    }
    setShowComments(!showComments)
  };

  return (
    <div style={{marginBottom: '20px', width: '80%', maxWidth: '100%'}}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 10px 20px',
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={photo.url}
            alt="Article Photo"
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component="div">
              {article.title}
            </Typography>
            <Typography variant='body2' color="text.secondary">
              {article.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={toggleShowComments}>
              {showComments ? <ArrowUpward /> : <ArrowDownward />}
              {showComments ? 'Hide Comments' : 'View Comments'}
            </Button>
        </CardActions>
        {showComments && (
          <CardContent
            sx={{
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            {comments.map(comment => (
              <div key={comment.id}>
                <h3>Comment by: {comment.name}</h3>
                <p>{comment.body}</p>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default Article;