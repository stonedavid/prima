import Base from "./containers/base.js";
import Home from "./components/homePage.js";
import Interface from "./containers/interfaceContainer.js";
import AuthContainer from "./containers/authContainer.js";
import Signup from "./containers/signUpContainer.js";
import Login from "./containers/logInContainer.js";
import Lessons from "./components/lessonsComponent.js";

const routes = {
    component: Base,
    childRoutes: [
        {
            path: "/",
            component: Home
        },
        
        {
            path: "/interface",
            component: Interface
        },
        
        {
            path: "/signup",
            component: Signup
        },
        
        {
            path: "/login",
            component: Signup
        },
        
        {
            path: "/lessons",
            component: Lessons
        }
        
        
        
    ]
};

export default routes;
