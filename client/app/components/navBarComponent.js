// TODO: connect to store to handle: value should match a Current_Page state value, handleChange should come from container

import React, { PropTypes, Component } from "react";

import { browserHistory } from "react-router";

import { Tabs, Tab } from "material-ui/Tabs";

import Auth from "../src/modules/Auth.js";

const loggedInTabs = [
    {
        label: "Play",
        value: "/lessons"
    },
    
    { 
        label: "Log Out",
        value: "/logout"
    }
];

const newVisitorTabs = [
    {
        label: "Log In",
        value: "/login"
    }
];

const tabStyle = {background: "linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)"}

const NavBar = ({ currentPage, onChange, isAuthenticated, style }) => (
        <Tabs 
            value={Auth.isUserAuthenticated() && currentPage==="/" ? "/lessons" : currentPage} //sorry kludge, but i'd rather do this than wrap the whole router with connect and browserHistory is async so it makes a mess
            onChange={onChange}
            style={Object.assign({},style,{zIndex: 999})}
            tabItemContainerStyle = {tabStyle}
        >
            { Auth.isUserAuthenticated() ?
                loggedInTabs.map( (tab,key) => {
                    return (
                    <Tab key={key} label={tab.label} value={tab.value}></Tab>
                    )
                })
            : newVisitorTabs.map( (tab,key) => {
                    return (
                    <Tab key={key} label={tab.label} value={tab.value}></Tab>
                    )
                })
            }
        </Tabs>
);
    
export default NavBar;
