import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button>로그인</button>
        <button>회원가입</button>
        <button>마이페이지</button>
      </header>
    </div>
  );
}

export default App;
