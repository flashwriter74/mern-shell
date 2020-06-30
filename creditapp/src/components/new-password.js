import React, {Component} from 'react';
import axios from 'axios';
import globalVars from '../globals';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from "../context";

import Spinner from "./Spinner";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, ButtonGroup } from '@material-ui/core';

var strongPaswordGenerator = require("strong-password-generator");
 

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

export class userEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserField = this.onChangeUserField.bind(this);
        this.genHash = this.genHash.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            userAlias: this.props.match.params.id,
            alias: this.props.match.params.uid,
            newPassword: '',
            formCancelled: false
        }
    }

    componentDidMount() {
        
    }
    
    genHash() {
        console.log("new hash");
        var newHash = strongPaswordGenerator.generatePassword();
        console.log(newHash);
        this.setState({
            newPassword: newHash
        });
    }

    onChangeUserField(e) {
        switch(e.target.name) {
            case "newPassword":
                this.setState({
                    newPassword: e.target.value
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
            core_pwd: this.state.newPassword,
        }

        console.log(newUser);

        localConn = globalVars.localServPort+'admin-db/new-hash';
        remoteConn = globalVars.remoteServPort+'admin-db/new-hash';
        //determine which string to use based isLocalConn boolean
        selectConn = globalVars.isLocalConn ? localConn : remoteConn;

        axios.put(selectConn, newUser)
            .then(res => {
                console.log("update status");
                console.log(res.data);

                this.setState({
                    userUpdated: true
                })
               
            });   
    }

    cancelForm() {
        this.setState({ formCancelled: true})
    }

    render() {
        
        if (this.state.userLoaded === false) {
            return (
                <React.Fragment>
                   <CssBaseline />
                    <AppBar style={barStyle}>
                        <Toolbar>
                        <img src="https://www.orbitenergy.us/wp-content/uploads/2018/09/Orbit-Energy-Power-Logo.png" width="125" alt="Orbit Solar" />
                        <Typography variant="h6" style={{marginLeft: 12}}>Orbit Solar Applications</Typography>
                        </Toolbar>
                    </AppBar> 
                    
                    <Spinner/>
                    <div align="center">
                        <h4>Application data loading</h4>
                    </div>
                </React.Fragment>
            )
        } else if (this.state.userUpdated === true) {
            return <Redirect to={{
                pathname: `../../users/${this.state.userAlias}`,
                state: { 
                
                }
            }} />
        } else if (this.state.formCancelled === true) {
            return <Redirect to={{
                pathname: `../../users/${this.state.userAlias}`,
                state: { 
                
                }
            }} />
        } else {
            return (
            <Consumer>
                {value => {
                const { dispatch, userProfile } = value;   
                const { classes } = this.props;
                    console.log("userProfile: ");
                    console.log(userProfile)
                    const userPaths = {
                        newApp: `../app-new/${userProfile.alias}`,
                        openApp: `../app-open/${userProfile.alias}`,
                        manageApps: `../app-manage/${userProfile.alias}`,
                        manageUsers: `../users/${userProfile.alias}`,
                        newUsers: `../new-user/${userProfile.alias}`,
                        home: `../../../home/${userProfile.alias}`,
                        login: `../../../${userProfile.alias}`
                    }    
                 return (
                    <React.Fragment>
                        <AppBar style={barStyle}>
                            <Toolbar>
                            <img src="https://www.orbitenergy.us/wp-content/uploads/2018/09/Orbit-Energy-Power-Logo.png" width="125" alt="Orbit Solar" />
                            <Typography variant="h6" style={{marginLeft: 12}}>Orbit Solar Applications</Typography>
                            <Link className={classes.adminAction}
                                to={`../../home/${this.state.userAlias}`}
                                >HOME</Link>
                            <Link className={classes.adminAction}
                                to={`../../`}
                                >LOGIN</Link>
                            </Toolbar>
                        </AppBar>
                    <div className="container">
                        <div style={{marginTop: 75, backgroundColor:'lightGrey', padding: 15}}>
                            <h3>Change Password</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Username / Alias:</label>
                                    <input type='text'
                                        className='form-control'
                                        name="alias"
                                        value={this.state.alias}
                                        enabled={false}
                                        onChange={this.onChangeUserField}
                                        />
                                </div>

                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type='text'
                                        className='form-control'
                                        name='newPassword'
                                        value={this.state.newPassword}
                                        onChange={this.onChangeUserField}
                                        />
                                    <br/>
                                    <ButtonGroup  variant="contained" color="primary" aria-label="contained primary button group">
                                
                                    <Button
                                    onClick={this.genHash}
                                    >Generate random strong password</Button>
                                        
                                    </ButtonGroup>
                                </div>

                
                                <div className="form-group">
                                    <input type="submit" value="Update User" className="btn-btn-primary" style={{fontWeight: 500, height: 55, backgroundColor: "#444", color: "#fff"}} />
                                    <input type="button" value="Cancel" onClick={this.cancelForm} className="btn-btn-primary" style={{fontWeight: 500, height: 55, backgroundColor: "#666", color: "#fff"}} />
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
export default withStyles(styles)(userEdit);