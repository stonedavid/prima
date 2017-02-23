import React from "react";
import Auth from "../src/modules/Auth";
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard.js";

class DashboardPage extends React.Component {
    
    /**
     * Class constructor
     **/
    constructor(props) {
        super(props);
        console.log("props",this.props);
        this.state = {
            secretData: ""
        };
    }
    
    /**
     * This method will exec post init render
     **/ 
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        console.log("email",this.props.email);
        xhr.open("get", "/api/users/" + this.props.email);
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

const mapStateToProps = (state) => {
    return {
        email: state.auth.email
    }
};

DashboardPage = connect(mapStateToProps)(DashboardPage);

export default DashboardPage;

