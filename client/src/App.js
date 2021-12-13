import './App.css';
import { Route } from 'react-router';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <Route exact path='/' render={()=> <LandingPage/>}/>
      <Route exact path='/home' render={()=> <Home/>}/>

      
    </div>
  );
}

export default App;
