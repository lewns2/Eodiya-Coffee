import React, { Fragment } from 'react';
import Nav from './components/Nav';
import Map from './components/Map';
import EodiyaMap from './pages/EodiyaMap';
import './styles/App.css'

import configureStore from "./store/index";
import reducers from "./reducer/reducers";
import { Provider } from "react-redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from "redux"; 
import Main from './components/Main';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// const store = configureStore(reducers, {
// });

const store = createStore(reducers, {}, composeWithDevTools());

console.log(store.getState());

const App = () => {
  const [isMain, setIsMain] = React.useState(true); 
  const mainend = () => {
    setIsMain(!isMain)
  }
  const ssd = () => {
    alert(isMain)
    setIsMain(false)
  }

 const theme = createTheme({
  typography: {
    fontFamily: [
      "BinggraeMelona-Bold"
    ].join(','),
  }
});
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div>
          { !isMain &&
            <Fragment>
              <Nav/>
              <EodiyaMap/>
            </Fragment>
          }
          { isMain &&
            
              <Main mainend={mainend}/>
          }
        </div>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
