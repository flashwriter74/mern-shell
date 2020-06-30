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

export default class userLogin extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserField = this.onChangeUserField.bind(this);
        this.enterDemoMode = this.enterDemoMode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            alias: '',
            password: '',
            loggedIn: false,
            profileId: '',
            navSchema: [],
            //this contains the required IDs used for retrieving nav options - typically gets populated via location props; this is exception, generated on session creation
            targetIds: [
                
                /*
                {
                    target: 'user-org',
                    //insert org id from user profile
                    id: '5dccb7d706b07e413c1eff2b'
                },
                {
                    target: 'league-wide',
                    //insert currently targeted league - if applicable
                    id: '5de2ea9647b35c7f5e75f3ee'
                }
                */
            ]
        }
    }

    componentDidMount() {
        if(this.props.alias) {
            this.setState({alias: this.props.alias})
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

            default:
        }
        
    }

    enterDemoMode = (dispatch, e) => {
        var tempDate = new Date();
        
        const newUser = {
            alias: "demouser",
            core_pwd: "demopwd",
            core_email: "NA",
            thisTime: tempDate
        }
        
        dispatch({
            type: 'SET_PROFILE',
            payload: newUser
        });

        this.setState({
            alias: "demouser",
            loggedIn: true
        })

    }

    onSubmit = (dispatch, e) => {
       //supress defualt form behavior
        e.preventDefault();
        var tempDate = new Date();

       // to store token in localStorage

        //new object to pass into http request
        const newUser = {
            alias: this.state.alias,
            core_pwd: this.state.password,
        }

        console.log(newUser);

        localConn = globalVars.localServPort+'admin-db/login';
        remoteConn = globalVars.remoteServPort+'admin-db/login';
        //determine which string to use based isLocalConn boolean
        selectConn = globalVars.isLocalConn ? localConn : remoteConn;

        axios.post(selectConn, newUser)
            .then(res => {
                console.log("returned user");
                console.log(res.data);
                const validUser = {
                    alias: this.state.alias,
                    core_email: res.data.core_email,
                }
                
                var creds = {
                    buyer: validUser,
                    funding: res.data.token
                }

                //this.requestSession(creds, dispatch);       

                dispatch({
                    type: 'SET_PROFILE',
                    payload: res.data
                });

                this.setState({ loggedIn: true})

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

    /*
    requestSession(stranger, dispatch) {
        localConn = globalVars.localServPort+'league/session';
        remoteConn = globalVars.remoteServPort+'league/session';
        //determine which string to use based isLocalConn boolean
        selectConn = globalVars.isLocalConn ? localConn : remoteConn;
        console.log("preparing session");
        console.log(stranger);

        axios.post(selectConn, stranger, {
            headers: {
                'access-token': `${stranger.funding}`,
            }
        })

        .then(res => {
            console.log(res);


            this.setState({
                loggedIn: true,
                profileId: stranger.buyer.profileId
            })

            var sessionData = {
                sid: res.data.session_id
            }

            dispatch({
                type: 'SET_SESSION',
                payload: sessionData
            });
        })
    }
        /// demo mode buttom markup
     <div style={{marginTop: 15, padding: 15}}>
                        
                    <Button onClick={this.enterDemoMode.bind(this, dispatch)} variant="contained" color="primary">
                        Enter Demo Mode
                    </Button>
                    </div>
    */
    render() {
        
        if(this.state.loggedIn === true) {
            return <Redirect to={{
                pathname: `/home/${this.state.alias}`,
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
                            </Toolbar>
                        </AppBar>
                    <div className="container">
                    <div style={{marginTop: 75, backgroundColor:'lightGrey', padding: 15}}>
                        <h3>User Login</h3>
                        <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                            <div className="form-group">
                                <label>Username / Alias:</label>
                                <input type='text'
                                    className='form-control'
                                    name="alias"
                                    value={this.state.alias}
                                    onChange={this.onChangeUserField}
                                    />
                            </div>
            
                            <div className="form-group">
                                <label>Password</label>
                                <input type='password'
                                    className='form-control'
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeUserField}
                                    />
                            </div>
            
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn-btn-primary" />
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