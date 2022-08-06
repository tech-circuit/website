import "./styles/all.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Index from "./components/Index";
import ProjectAlter from "./components/ProjectAlter";
import Community from "./components/Community";
import Resources from "./components/Resources";
import Forums from "./components/Forum";
import Post from "./components/Post";
import Events from "./components/Events.jsx";
import About from "./components/About";
import Work from "./components/Work";
import OrgAlter from "./components/OrgAlter";
import EventAlter from "./components/EventAlter";
import Profile from "./components/Profile";
import UserFlow from "./components/UserFlow";
// import Soon from "./components/Soon";
import User from "./components/User";
import OrgView from "./components/OrgView";
import EventView from "./components/EventView";
import ProjectView from "./components/ProjectView";
import Error from "./components/Error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import BASE_API_URL from "./constants";

const App = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${BASE_API_URL}`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <Router>
            <ScrollToTop />
            {socket ? <Navbar socket={socket} /> : null}
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route exact path="/work">
                    <Work socket={socket} />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/events">
                    <Events />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/create-project">
                    <ProjectAlter edit={false} />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/edit-project/:id">
                    <ProjectAlter edit={true} />
                </Route>
                <Route exact path="/community">
                    <Community />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/org">
                    <OrgView />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/org/:orgId">
                    <OrgView />
                </Route>
                <Route exact path="/org/admin/:orgId">
                    <OrgView />
                </Route>
                <Route exact path="/resources">
                    <Resources />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/forum">
                    <Forums />
                </Route>
                <Route exact path="/create-org">
                    <OrgAlter edit={false} />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/edit-org/:id">
                    <OrgAlter edit={true} />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/create-event">
                    <EventAlter edit={false} />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/edit-event/:id">
                    <EventAlter edit={true} />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/event/:eventId" component={EventView} />
                <Route
                    exact
                    path="/project/:projectId"
                    component={ProjectView}
                />
                <Route exact path="/profile">
                    <Profile />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/profile-setup">
                    <UserFlow />
                </Route>
                <Route exact path="/register">
                    <SignUp />
                </Route>
                <Route exact path="/login">
                    <SignIn />
                </Route>
                <Route exact path="/forum/post/:postId">
                    {socket ? <Post socket={socket} /> : null}
                </Route>
                <Route exact path="/user/:userId" component={User} />
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
