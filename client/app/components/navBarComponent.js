// TODO: connect to store to handle: value should match a Current_Page state value, handleChange should come from container

import React, { PropTypes, Component } from "react";

import { browserHistory } from "react-router";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Tabs, Tab } from "material-ui/Tabs";

const NavBar = ({ currentPage, onChange, isAuthenticated }) => (
    <MuiThemeProvider>
        <Tabs 
            value={currentPage}
            onChange={onChange}
        >
            <Tab label="Home" value="">
            </Tab>
            <Tab label="Lessons" value="/lessons">
            </Tab>
            <Tab label="Interface" value="/interface">
            </Tab>
            <Tab label={ isAuthenticated === true ? "Log out" : "Log in" } value="/login">
            </Tab>
        </Tabs>
    </MuiThemeProvider>
);
    
export default NavBar;
