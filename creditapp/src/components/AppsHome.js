import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'; 
import globalVars from '../globals';
//import { supports_html5_storage } from "../storage";
import { Consumer } from '../context';
import Spinner from "./Spinner";
//material-ui assets
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';


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
          marginRight: 12
      }
  }

  const adminList = [
      "rootuser", "elewellen", "sstceo"
  ]

  var fullAdmin = 0;

function supports_html5_storage() {
    try {
        console.log(window['localStorage'] !== null);
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

var storageRole = localStorage.getItem('fullAdmin');

export class AppsHome extends Component {
    constructor(props) {
        //retrieve parent properties
        super(props);
        
        this.state = {
            alias: this.props.match.params.id,
            dispatchCompleted: false,
            //placeholder state defaulted to true
            rolesLoaded: true
            //this contains what nav categories need to be populated and how
        };

        //this.updateNavOps = this.updateNavOps.bind(this);
    }

    componentDidMount() {

    }


    dispatchAll(dispatch, me) {
        const profileSetup = {
            alias: me.alias,
            email: me.email,
            fname: me.fname,
            lname: me.lname,
            fullAdmin: me.fullAdmin
        }
        
        if (this.state.dispatchCompleted === false) {
            dispatch({
                type: 'SET_PROFILE',
                payload: profileSetup
            });
            console.log("dispatch complete");
        }
    }

    storeLocal(goods) {
        //localStorage workaround
        var canStore = supports_html5_storage();

        if (canStore) {
            // window.localStorage is available!
            console.log("storage available");
            
            localStorage.setItem('userAlias', goods.alias);
            localStorage.setItem('userEmail', goods.email);
            localStorage.setItem('userFname', goods.fname);
            localStorage.setItem('userLname', goods.lname);
            localStorage.setItem('fullAdmin', goods.fullAdmin);
            const fullname = `${goods.fname} ${goods.lname}`;
            /*
            const rememberMe = localStorage.getItem('accessProfile');
            console.log(rememberMe);
            */
        } else {
            // no native support for HTML5 storage :(
            // maybe try dojox.storage or a third-party solution
        }
            
    }

    onChangeOrg(e) {
        this.setState({
            orgFormOption: e.target.value
        });  
    }

    onSubmit = (dispatch, e) => {
        e.preventDefault();
        console.log(e.target.orgrole.value);
        //console.log(this.state.orgRoles);
        //grab correct org object from array, then set as selectedOrg in state
        var orgVal = this.state.orgRoles.filter(entry => entry.orgId === e.target.orgrole.value);
        //console.log(orgVal);

        if(orgVal) {
            //get associated league and team data
            this.confirmAssociations(this.state.alias, orgVal[0], false, dispatch);
        }
        
    }

    
    render() { 
        return (
            <Consumer>
                {value => {
                    const { classes } = this.props;
                    const { dispatch, userProfile } = value;
                    var returnedProfile = {}
                    if (value.hasOwnProperty('userProfile')) {
                        console.log("context: ");
                        console.log(value);
                        returnedProfile = userProfile;
                    } else {
                        const { dispatch } = value;
                        console.log("empty profile");

                    }
                    
                    var userPaths = {};
                    if(returnedProfile.alias === '') {
                        // Object is empty (Would return true in this example)
                        /*
                        const stAlias = localStorage.getItem('userAlias');
                        const stEmail = localStorage.getItem('userEmail');
                        const stFname = localStorage.getItem('userFname');
                        const stLname = localStorage.getItem('userLname');
                        const stAdmin = localStorage.getItem('fullAdmin');

                        //console.log(rememberMe);
                        userPaths = {
                            newApp: `../app-new/${stAlias}`,
                            openApp: `../app-open/${stAlias}`,
                            manageApps: `../app-manage/${stAlias}`,
                            manageJobs: `../job-manage/${stAlias}`,
                            manageUsers: `../users/${stAlias}`,
                        }

                        const restoreProfile = {
                            alias: stAlias,
                            email: stEmail,
                            fname: stFname,
                            lname: stLname, 
                            fullAdmin: stAdmin
                        }

                        returnedProfile = restoreProfile;
                        this.dispatchAll(dispatch, restoreProfile);
                        */
                       userPaths = {
                        newApp: `../app-new/${this.state.alias}`,
                        openApp: `../app-open/${this.state.alias}`,
                        manageApps: `../app-manage/${this.state.alias}`,
                        manageJobs: `../job-manage/${this.state.alias}`,
                        manageUsers: `../users/${this.state.alias}`,
                        reportJobs: `../job-report/${this.state.alias}`
                       }
                    } else {
                        userPaths = {
                            newApp: `../app-new/${this.state.alias}`,
                            openApp: `../app-open/${this.state.alias}`,
                            manageApps: `../app-manage/${this.state.alias}`,
                            manageJobs: `../job-manage/${this.state.alias}`,
                            manageUsers: `../users/${this.state.alias}`,
                            reportJobs: `../job-report/${this.state.alias}`
                        }
                       /*
                        userPaths = {
                            newApp: `../app-new/${returnedProfile.alias}`,
                            openApp: `../app-open/${returnedProfile.alias}`,
                            manageApps: `../app-manage/${returnedProfile.alias}`,
                            manageJobs: `../job-manage/${returnedProfile.alias}`,
                            manageUsers: `../users/${returnedProfile.alias}`,
                        }
                        */

                        const stAlias = localStorage.getItem('userAlias');
                        console.log("have alias:");
                        console.log(stAlias);
                        if(stAlias === "undefined") {
                            this.storeLocal(userProfile);
                        }
                        
                    }
                    
                    var isAdmin = adminList.filter(entry => entry === this.state.alias);
                    if(isAdmin.length !== 0) {
                        fullAdmin = 1;
                    }

                    console.log("have admin rights:");
                        console.log(storageRole);
                    
                    console.log("paths");
                    console.log(userPaths);
                    /* for demo use only
                    const userPaths = {
                        newApp: `../app-new/demouser`,
                        openApp: `../app-open/demouser`,
                        manageApps: `../app-manage/demouser`,
                        manageJobs: `../job-manage/demouser`,
                        manageUsers: `../users/demouser`,
                    }

                    */
                    ///this first condition currently DOES NOT APPLY - here for future consideration, if roles are added
                    if (this.state.rolesLoaded === false) {
                        return (
                            <React.Fragment>
                               <CssBaseline />
                                <AppBar style={barStyle}>
                                    <Toolbar>
                                    <img src="https://www.orbitenergy.us/wp-content/uploads/2018/09/Orbit-Energy-Power-Logo.png" width="125" alt="Orbit Solar" />
                                    <Typography variant="h6" style={{marginLeft: 12}}>Orbit Solar Applications</Typography>
                                    <Button color="inherit" href="../" style={{marginLeft: 20}}>Login / Logout</Button>
                                    </Toolbar>
                                </AppBar> 
                                
                                <Spinner/>
                            </React.Fragment>
                        )
                    } else {
                        if (returnedProfile.fullAdmin == 1 || storageRole == 1 || fullAdmin == 1) {
                            //user is a full admin
                            return (
                                <React.Fragment>
                                   <CssBaseline />
                                    <AppBar style={barStyle}>
                                        <Toolbar>
                                        <img src="https://www.orbitenergy.us/wp-content/uploads/2018/09/Orbit-Energy-Power-Logo.png" width="125" alt="Orbit Solar" />
                                        <Typography variant="h6" style={{marginLeft: 12}}>Orbit Solar Applications</Typography>
                                        <Button color="inherit" href="../" style={{marginLeft: 20}}>Login</Button>
                                        </Toolbar>
                                    </AppBar> 
                                    
                                    <div className="container" style={{marginTop: 75, padding: 15}}>
                                        <h3>Home</h3>
                                        <div style={{marginTop: 15, padding: 15}}>
    
                                        <Button className={classes.adminAction} href={userPaths.newApp} variant="contained" color="primary">
                                            Start New Application
                                        </Button>
                                        <br/><br/>
                                        <Button className={classes.adminAction} href={userPaths.manageApps} variant="contained" color="primary">
                                            Manage Existing Applications
                                        </Button>
    
                                        <Button className={classes.adminAction} href={userPaths.manageUsers} variant="contained" color="primary">
                                            Manage Users
                                        </Button>

                                        <Button className={classes.adminAction} href={userPaths.reportJobs} variant="contained" color="primary">
                                            View / Export Jobs Report
                                        </Button>
    
    
                                        </div>
    
    
                                        
                                        
                                    </div>
                                </React.Fragment>
                                
                                
                            )
                        } else {
                            return (
                                <React.Fragment>
                                   <CssBaseline />
                                    <AppBar style={barStyle}>
                                        <Toolbar>
                                        <img src="https://www.orbitenergy.us/wp-content/uploads/2018/09/Orbit-Energy-Power-Logo.png" width="125" alt="Orbit Solar" />
                                        <Typography variant="h6" style={{marginLeft: 12}}>Orbit Solar Applications</Typography>
                                        <Button color="inherit" href="../" style={{marginLeft: 40}}>Login</Button>
                                        </Toolbar>
                                    </AppBar> 
                                    
                                    <div className="container" style={{marginTop: 75, padding: 15}}>
                                        <h3>Home</h3>
                                        <div style={{marginTop: 15, padding: 15}}>
    
                                        <Button className={classes.adminAction} href={userPaths.newApp} variant="contained" color="primary">
                                            Start New Application
                                        </Button>

                                        </div>
    
    
                                        
                                        
                                    </div>
                                </React.Fragment>
                                
                                
                            )
                        }
                        
                        
                    }
                }}
            </Consumer>
        )  
    }
}

export default withStyles(styles)(AppsHome);