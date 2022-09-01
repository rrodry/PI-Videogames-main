import './App.css';
import Home from './components/Home';
import Landing from './components/LandingPage';
import Detail from './components/DetailGame'
import CreateGame from './components/CreateGame';
import {
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>

        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/home' component= {Home} />
          <Route exact path='/details/:id' component={Detail}/>
          <Route exact path='/createGame' component={CreateGame}/>

        </Switch>
 
    </BrowserRouter>
  );
}

export default App;
