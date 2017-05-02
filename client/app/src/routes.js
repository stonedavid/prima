import Base from "../containers/base.js";

import Home from "../components/homePage.js";
import Interface from "../containers/interfaceContainer.js";
import Signup from "../containers/signupContainer.js";
import Login from "../containers/loginContainer.js";
import Lessons from "../containers/lessonsContainer.js";
import Dashboard from "../containers/DashboardPage.js";

import Auth from "./modules/Auth";

const routes = {
    component: Base,
    childRoutes: [
        {
            path: "/",
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, Dashboard);
                } else {
                    callback(null, Home);
                }
            }
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
            component: Login
        },
        
        {
            path: "/lessons",
            component: Lessons
        },
        
        {
            path: "/logout",
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                replace("/");
            }
        }
        
        
        
    ]
};

export default routes;
