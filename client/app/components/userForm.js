

import React, { PropTypes, Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider  from "material-ui/styles/MuiThemeProvider";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            password: ""
        };
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        
    }
    
    render() {
        return (
        <MuiThemeProvider>
            <form onSubmit={(e) => this.props.onSubmit(e,this.state)}>
                <Card>
                    <TextField
                        floatingLabelText="Your name"
                        name={"userName"}
                        onChange={this.onChange}
                        errorText={this.props.errors.userName}
                    /><br/>
                    <TextField
                        floatingLabelText="Email address"
                        name={"email"}
                        onChange={this.onChange}
                        errorText={this.props.errors.email}
                    /><br/>
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        name={"password"}
                        onChange={this.onChange}
                        errorText={this.props.errors.password}
                    />
                    <br/>
                    <CardActions>
                        <FlatButton label="Log In" type="submit" primary={true} />
                        <CardText>
                            Don't have a profile?
                        </CardText>
                        <FlatButton label="Sign Up" secondary={true} />
                    </CardActions>
                </Card>
            </form>
        </MuiThemeProvider>
            );
    }
}


export default UserForm;