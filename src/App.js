import React from 'react';
import './App.css';
import Fetch from './Components/Fetch';
import Sidebar from './Components/Sidebar';

const App = () => {

  return (
      <div style={{flex: '1', padding: '20px'}} >
        <Fetch />
      </div>
  );
}

export default App;
