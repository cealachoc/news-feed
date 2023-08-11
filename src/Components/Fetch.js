import React, { useEffect, useState } from "react";
import Feed from './Feed'
import Error from './Error'

const Fetch = ( {error}) => {

  const [articles, setArticles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
      fetch('https://jsonplaceholder.typicode.com/photos').then(response => response.json())
    ])
    .then(([articlesData, photosData]) => {
      setArticles(articlesData);
      setPhotos(photosData);
      setIsLoading(false);
    })
    .catch(error => {
        <Error />
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Feed articles={articles} photos={photos} />
      )}
    </div>
  )
}

export default Fetch;
