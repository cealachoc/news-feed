import * as React from 'react';
import './Styles/Feed.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Articles({ articles, photos }) {
  const cardsPerRow = 3;

  const rows = [];
  for (let i = 0; i < articles.length; i += cardsPerRow) {
    const row = articles.slice(i, i + cardsPerRow);
    rows.push(row);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px', // Add some padding to separate content from edges
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
          {row.map((article, columnIndex) => (
            <Card
              key={columnIndex}
              sx={{ maxWidth: 300, width: '100%', marginRight: '20px' }}
            >
              <CardActionArea>
                <CardMedia 
                  component="img"
                  height="140"
                  image={photos[columnIndex].url}
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
                <Button size="small" color="primary">
                  View Comments
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
