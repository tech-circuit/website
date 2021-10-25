import "./styles/all.css";
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
// import Soon from "./components/Soon";
import User from "./components/User";
import OrgView from "./components/OrgView";
import Error from "./components/Error";
import React from "react";
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
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/events">
                    <Events />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/create">
                    <CreateProject />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/community">
                    <Community />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/user">
                    <User />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/org">
                    <OrgView />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/resources">
                    <Resources />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/forum">
                    <Forums />
                </Route>
                <Route exact path="/create-post">
                    <CreatePost />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/organize">
                    <Organize />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/profile">
                    <Profile />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/forum/post/:postId" component={Post} />
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
