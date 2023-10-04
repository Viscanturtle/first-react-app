import logo from './logo.svg';
import './App.css';
import Header from './header';
import Main from './main';
import Browse from './browse';
import Favorites from './favorites';
import { Route, BrowserRouter as Router, Routes } from'react-router-dom';

function App() {
  return (
    <>
    <Header />
    
    <Router>
      <Routes>
        <Route path="/" Component={Main}></Route>
        <Route path="/browse" Component={Browse}></Route>
        <Route  path="/favorites" Component={Favorites}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
