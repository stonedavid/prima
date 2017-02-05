// TODO: connect to store to handle: value should match a Current_Page state value, handleChange should come from container

import React, { PropTypes, Component } from "react";

import { browserHistory } from "react-router";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Tabs, Tab } from "material-ui/Tabs";

class NavBar extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            value: "Home"
        };
        this.handleChange = this.handleChange.bind(this);
        context.router;
    }
    
    handleChange = (value) => {
        browserHistory.push("/" + value);
        this.setState({
            value: value,
        });
    }
    
    render() {
        return (
            <MuiThemeProvider>
                <Tabs 
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Home" value="">
                    </Tab>
                    <Tab label="Interface" value="interface">
                    </Tab>
                    <Tab label="Sign Up" value="signup">
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
            );
    }
}

NavBar.contextTypes = {
    router: React.PropTypes.object
    };
    
export default NavBar;
