import React, {Component} from 'react';
import axios from 'axios';
import globalVars from '../globals';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from "../context";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

function supports_html5_storage() {
    try {
        console.log(window['localStorage'] !== null);
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

var selectConn = '';
var remoteConn = '';
var localConn = '';

var barStyle = {
    backgroundColor: "#f02416"
}

const styles = {
    root: {
      margin: 20,
    },
    gridList_root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#eee',
      },
      gridList: {
        width: 500,
        height: 450,
      },
      gridListTile: {
          cursor: "hand"
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
      adminAction: {
        marginLeft: 25,
        color: "#fff",
        fontSize: "1.1em"
    }
  };


export class userLogin extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserField = this.onChangeUserField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userAlias: this.props.match.params.id,
            alias: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            userCreated: false
        }
    }
    
    onChangeUserField(e) {
        switch(e.target.name) {
            case "alias":
                this.setState({
                    alias: e.target.value
                });
            break;
            case "password":
                this.setState({
                    password: e.target.value
                });
            break;
            case "email":
                this.setState({
                    email: e.target.value
                });
            break;
            case "lastName":
                this.setState({
                    lastName: e.target.value
                });
            break;
            case "firstName":
                this.setState({
                    firstName: e.target.value
                });
            break;

            default:
        }
        
    }

    onSubmit = (e) => {
       //supress defualt form behavior
        e.preventDefault();
        var tempDate = new Date();

       // to store token in localStorage

        //new object to pass into http request
        const newUser = {
            alias: this.state.alias,
            core_pwd: this.state.password,
            core_email: this.state.email,
            core_fname: this.state.firstName,
            core_lname: this.state.lastName,
            createdAt: tempDate
        }

        console.log(newUser);

        localConn = globalVars.localServPort+'admin-db/add-user';
        remoteConn = globalVars.remoteServPort+'admin-db/add-user';
        //determine which string to use based isLocalConn boolean
        selectConn = globalVars.isLocalConn ? localConn : remoteConn;

        axios.post(selectConn, newUser)
            .then(res => {
                console.log("returned user");
                console.log(res.data);

                this.setState({
                    userCreated: true
                })
                
                /* localStorage workaround
                var canStore = supports_html5_storage();

                if (canStore) {
                    // window.localStorage is available!
                    console.log("storage available");
                    localStorage.setItem('accessToken', res.data.token);

                    const rememberMe = localStorage.getItem('accessToken');
                    console.log(rememberMe);
                  } else {
                    // no native support for HTML5 storage :(
                    // maybe try dojox.storage or a third-party solution
                  }
                */
            });   
    }

    render() {
        const { classes } = this.props;
        if(this.state.userCreated === true) {
            return <Redirect to={{
                pathname: `../users/${this.state.userAlias}`,
                state: { 
                
                }
            }} />
        } else {
            return (
            <Consumer>
                {value => {
                const { dispatch } = value;       
                 return (
                    <React.Fragment>
                        <AppBar style={barStyle}>
                            <Toolbar>
                            <img src="https://www.orbitenergy.us/wp-content/uploads/2018/09/Orbit-Energy-Power-Logo.png" width="125" alt="Orbit Solar" />
                            <Typography variant="h6" style={{marginLeft: 12}}>Orbit Solar Applications</Typography>
                            <Link className={classes.adminAction}
                                        to={`../home/${this.state.userAlias}`}
                                        >HOME</Link>
                                        <Link className={classes.adminAction}
                                        to={`../`}
                                        >LOGIN</Link>
                            </Toolbar>
                        </AppBar>
                    <div className="container">
                        <div style={{marginTop: 75, backgroundColor:'lightGrey', padding: 15}}>
                            <h3>Create New User</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Username / Alias:</label>
                                    <input type='text'
                                        className='form-control'
                                        name="alias"
                                        defaultValue={this.state.alias}
                                        onChange={this.onChangeUserField}
                                        />
                                </div>
                
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type='password'
                                        className='form-control'
                                        name="password"
                                        defaultValue={this.state.password}
                                        onChange={this.onChangeUserField}
                                        />
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type='text'
                                        className='form-control'
                                        name="email"
                                        defaultValue={this.state.email}
                                        onChange={this.onChangeUserField}
                                        />
                                </div>


                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type='text'
                                        className='form-control'
                                        name="firstName"
                                        defaultValue={this.state.firstName}
                                        onChange={this.onChangeUserField}
                                        />
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type='text'
                                        className='form-control'
                                        name="lastName"
                                        defaultValue={this.state.lastName}
                                        onChange={this.onChangeUserField}
                                        />
                                </div>
                
                                <div className="form-group">
                                <input type="submit" value="Create User" className="btn-btn-primary" style={{fontWeight: 500, height: 55, backgroundColor: "#444", color: "#fff"}} />
                                </div>
                            
                
                            </form>
                        </div>
                    </div>
                    </React.Fragment>
                   )
                 }}
                 </Consumer>
            )
            
        }
        
          
    }
}

export default withStyles(styles)(userLogin);