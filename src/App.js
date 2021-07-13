import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import CreateProject from "./components/CreateProject";
import Community from "./components/Community";
import Resources from "./components/Resources";
import Forums from "./components/Forum";
import Post from "./components/Post";
import Events from "./components/Events";
import About from "./components/About";
import Work from "./components/Work";
import CreatePost from "./components/CreatePost";
import Organize from "./components/Organize";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/work">
          <Work />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/events">
          <Events />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create">
          <CreateProject />
        </Route>
        <Route exact path="/community">
          <Community />
        </Route>
        <Route exact path="/resources">
          <Resources />
        </Route>
        <Route exact path="/forum">
          <Forums />
        </Route>
        <Route exact path="/create-post">
          <CreatePost />
        </Route>
        <Route exact path="/organize">
          <Organize />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/forum/post/:postId" component={Post} />
      </Switch>
    </Router>
  );
};

export default App;
