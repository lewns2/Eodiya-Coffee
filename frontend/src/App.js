import './App.css';
import Mypage from'./pages/Mypage';
import Calendar from './pages/Calender'
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Mypage />
      </BrowserRouter>,
      </header>
    </div>
  );
}

export default App;
