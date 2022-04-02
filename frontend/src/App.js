import React from 'react';
import Nav from './components/Nav';
import Map from './components/Map';
import Main from './components/Main';
import './styles/App.css'

const App = () => {
  const [isMain, setIsMain] = React.useState(true); 
  const mainend = () => {
    setIsMain(!isMain)
  }
  const ssd = () => {
    alert(isMain)
    setIsMain(false)
  }
  return (
    <div>
      {isMain &&(
        <>
          <Nav/>
          <button onClick={ssd}>asd</button>
          <Map/>
        </>
      )}
      {!isMain &&(<Main mainend={mainend} />)}
    </div>
  );
};

export default App;
