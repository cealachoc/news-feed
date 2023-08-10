import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feed from './Components/Feed';


const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.log('Error fetching articles', error);
      })
  }, []);

  return (
    <div>
      <Feed articles={articles} />
    </div>
  );
}

export default App;
