import React from 'react';
import Nav from './components/Nav';
import Map from './components/Map';
import './styles/App.css'
import { Button } from '@mui/material';

const App = () => {
  return (
    <div>
      <Nav/>
      <Button>Hello World</Button>
      <Map/>
    </div>
  );
};

export default App;
