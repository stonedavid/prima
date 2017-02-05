import React, { PropTypes, Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from "material-ui/Divider";
import MuiThemeProvider  from "material-ui/styles/MuiThemeProvider";

class SignUpComponent extends Component {
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
        }, function() {
            console.log(this.state);
        });
        
    }
    
    render() {
        return (
        <MuiThemeProvider>
            <form onSubmit={(e) => this.props.onSubmit(e,this.state)} style={{boxShadow: "0px 0px 0px 0px"}}>
                <Card>
                    <CardHeader
                        title="Create a profile:"
                        style={{textAlign: "left"}}
                    /><br/>
                    
                    <TextField
                        name={"userName"}
                        onChange={this.onChange}
                    /><br/>
                    <TextField
                        name={"email"}
                        onChange={this.onChange}
                    /><br/>
                    <TextField
                        name={"password"}
                        onChange={this.onChange}
                    />
                    <br/>
                    <CardActions>
                        <FlatButton label="Submit" type="submit"/>
                    </CardActions>
                </Card>
            </form>
        </MuiThemeProvider>
            );
    }
}


export default SignUpComponent;