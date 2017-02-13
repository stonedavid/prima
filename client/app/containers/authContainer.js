import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { changeUrl } from "../actions/actions.js";
//Ok, so this protects the route well, but doesn't redirect after state change...
//Literally, all I need is for the submit on login or signup to redirect to interface or whatever after state change
//ok great, but the reducer doesn't have side-effects!

//needs to be wrapped with connect so

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
                this.props.changeUrl();
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
    
    const mapDispatchToProps = (dispatch) => ({
        changeUrl: () => {
            dispatch(changeUrl("/login"))
        }
    });
    
    return connect(mapStateToProps,mapDispatchToProps)(AuthenticatedComponent);
        
}

export default authContainer;