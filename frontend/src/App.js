import React from 'react';
import Nav from './components/Nav';
import Map from './components/Map';
import EodiyaMap from './pages/EodiyaMap';
import './styles/App.css'

import configureStore from "./store/index";
import reducers from "./reducer/reducers";
import { Provider } from "react-redux";


const store = configureStore(reducers, {
});

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
    <Provider store={store}>
      <div>
        <Nav/>
        <EodiyaMap/>

      </div>
    </Provider>
  );
};

export default App;
