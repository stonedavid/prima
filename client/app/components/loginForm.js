

import React, { PropTypes, Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  card: {
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    display: "inline-block"
  }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        const storedMessage = localStorage.getItem("successMessage");
        let successMessage = "";
        
        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem("successMessage");
        }
        
        this.state = {
            userName: "",
            email: "",
            password: "",
            successMessage
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
            <form onSubmit={(e) => this.props.onSubmit(e,this.state)}>
                <Card style={styles.card} zDepth={3}>
                    <CardHeader
                        title="Login"
                        subtitle="If you already have a profile, enter your information below"
                        style={{textAlign: "left", paddingLeft: "32px"}}
                    />
                    {this.state.successMessage && <p>{this.state.successMessage}</p>}
                    {this.props.errors.summary && <p style={{color: "red"}}>{this.props.errors.summary}</p>}
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
                        <FlatButton label="Sign Up" secondary={true} onClick={() => this.props.changeUrl("/signup")}/>
                    </CardActions>
                </Card>
            </form>
            );
    }
}


export default LoginForm;