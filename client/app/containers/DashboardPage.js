import React from "react";
import Auth from "../src/modules/Auth";
import Dashboard from "../components/Dashboard.js";

class DashboardPage extends React.Component {
    
    /**
     * Class constructor
     **/
    constructor(props) {
        super(props);
        
        this.state = {
            secretData: ""
        };
    }
    
    /**
     * This method will exec post init render
     **/ 
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/dashboard");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message
                });
            }
        });
        xhr.send();
    }
    
    render() {
        return (<Dashboard secretData={this.state.secretData} />);
    }
}

export default DashboardPage;