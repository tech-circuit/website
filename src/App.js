import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Index from './components/Index';
import CreateProject from './components/CreateProject';
import Community from './components/Community';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/"><div className="container"><Index/></div></Route>
        <Route exact path="/login"><div className="container"><Login/></div></Route>
        <Route exact path="/create"><div className="container"><CreateProject/></div></Route>
        <Route exact path="/community"><div className="container"><Community/></div></Route>
      </Switch>
    </Router>
  );
}

export default App;
