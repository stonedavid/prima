import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

//Ok, so this protects the route well, but doesn't redirect after state change...
//Literally, all I need is for the submit on login or signup to redirect to interface or whatever after state change
//ok great, but the reducer doesn't have side-effects!

function authContainer(WrappedComponent) {
    
    class AuthenticatedComponent extends Component {
        constructor(props) {
            super(props);
            this.checkAuth = this.checkAuth.bind(this);
        }
        
        componentWillMount() {
            this.checkAuth();
        }
        
        componentWillReceiveProps() {
            this.checkAuth();
        }
        
        checkAuth() {
            if (!this.props.isAuthenticated) {
                console.log("redirecting, not logged in");
                browserHistory.push("/signup");
            }
        }
        
        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true ? 
                        <WrappedComponent /> 
                    :
                        <h2> nothing here </h2>
                    }
                </div>
            )
        }
    }
        
    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
        
    });
    
    return connect(mapStateToProps)(AuthenticatedComponent);
        
}

export default authContainer;