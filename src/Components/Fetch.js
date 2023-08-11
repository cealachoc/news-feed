import React, { useEffect, useState } from "react";
import Feed from './Feed'
import Error from './Error'

const Fetch = ( {error}) => {

  const [articles, setArticles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false)
        return <Error />
      });

    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        return <Error />
      });
  }, []);

return (
  <div>
  <Feed articles={articles} photos={photos}/>
  </div>
)
}

export default Fetch;