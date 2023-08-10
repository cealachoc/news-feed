import React, { useEffect, useState } from "react";
import Feed from './Feed'
import Error from './Error'

const Fetch = ( {error}) => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
      })
      .catch(error => {
        return <Error />
      });
  }, []);

return (
  <div>
  <Feed articles={articles} />
  </div>
)
}

export default Fetch;