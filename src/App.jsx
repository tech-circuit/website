import "./styles/all.css";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import ProjectAlter from "./components/Project-alter";
import Community from "./components/Community";
import Resources from "./components/Resources";
import Forums from "./components/Forum";
import Post from "./components/Post";
import Events from "./components/Events.jsx";
import About from "./components/About";
import Work from "./components/Work";
import CreateOrg from "./components/CreateOrg.jsx";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";
import Profile from "./components/Profile";
import UserFlow from "./components/UserFlow";
// import Soon from "./components/Soon";
import User from "./components/User";
import OrgView from "./components/OrgView";
import EventView from "./components/EventView";
import Error from "./components/Error";
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
                <Route exact path="/resources">
                    <Resources />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/forum">
                    <Forums />
                </Route>
                <Route exact path="/create-org">
                    <CreateOrg />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/create-event">
                    <CreateEvent />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/edit-event">
                    <EditEvent />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/view-event">
                    <EventView />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                    {/* <Soon /> */}
                </Route>
                <Route exact path="/sign-up">
                    <UserFlow />
                </Route>
                <Route exact path="/forum/post/:postId" component={Post} />
                <Route exact path="/org/:orgId" component={OrgView} />
                <Route exact path="/user/:userId" component={User} />
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
