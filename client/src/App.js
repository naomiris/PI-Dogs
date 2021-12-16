import './App.css';
import { Route } from 'react-router';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import CreateDog  from './components/CreateDog';
import Details from './components/Details';
import NavBar from './components/NavBar';



function App() {
  return (
    <div className="App">
      <Route exact path='/' render={()=> <LandingPage/>}/>
      <Route  path='/home' render={()=> <Home/>}/>
      <Route path='/home' render={()=><NavBar/>} />
     <Route exact path='/dog' render={()=><CreateDog/>}/>
     <Route  path='/dogs/:id' render={()=><Details/>}/>
      
    </div>
  );
}

export default App;
