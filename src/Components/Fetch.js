import React, { useEffect, useState } from "react";
import Feed from './Feed'

const Fetch = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
      })
      .catch(error => {
        console.log("Error fetching articles: " + error);
      });
  }, []);

return (
  <div>
  <Feed articles={articles} />
  </div>
)
}

export default Fetch;