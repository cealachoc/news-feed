import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import Feed from './Feed'
import Error from './Error'

const Fetch = ( {error}) => {

  const [articles, setArticles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json()),
      fetch('https://picsum.photos/v2/list').then(response => response.json())
    ])
    .then(([articlesData, photosData, commentsData]) => {
      const articlesWithComments = articlesData.map(article => ({
        ...article,
        showComments: false
      }));
      setArticles(articlesData);
      setComments(commentsData);

      const picsumPhotos = photosData.map(photo => ({
        url: 'https://picsum.photos/seed/${image}/300',
      }));
      setPhotos(picsumPhotos);
      setIsLoading(false);
    })
    .catch(error => {
      <Error />
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <Feed articles={articles} photos={photos} comments={comments} setArticles={setArticles}/>
      ) :
      <div>
        <h1>Loading Data...</h1>
        <LinearProgress />
      </div>}
    </div>
  )
}

export default Fetch;
