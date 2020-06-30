import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import {Link} from "react-router-dom";
import axios from 'axios';
import globalVars from '../globals';
import { Consumer } from '../context';
import Spinner from "./Spinner";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { Button, ButtonGroup } from '@material-ui/core';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

var CryptoJS = require("crypto-js");
var unlockAll = "sst-orbit-lynchpin";
/*
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
*/


//import SignaturePad from "./SignaturePad";
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

export class ApplicationList extends Component {
    constructor(props) {
        super(props);

        this.decryptState = this.decryptState.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.state = {
            receivedUsers: [],
            userAlias: this.props.match.params.id,
            headCells : [
                { id: 'user', numeric: false, disablePadding: true, label: 'User Full Name' },
                { id: 'alias', numeric: false, disablePadding: true, label: 'User Alias' },
                { id: 'entered', numeric: false, disablePadding: true, label: 'Email Address' },
                { id: 'active', numeric: false, disablePadding: true, label: 'Active' },
              ],
            usersLoaded: false

        }
    }
    
componentDidMount() {
    //const decryptor = this.decryptState;
    Promise.all([this.getUsers()])
    .then(data=> {
        // Both requests are now complete
        console.log("returned");
        //console.log(data[0].data);
        const appArray = data[0].data;
        console.log(appArray);
        this.setState({
            receivedUsers: appArray,
            usersLoaded: true
        })
    })
    .catch(err => {
        console.log(err)

    })
}

getUsers() {
    const localConn = globalVars.localServPort+'db/users/all';
    const remoteConn = globalVars.remoteServPort+'db/users/all';
    const selectConn = globalVars.isLocalConn ? localConn : remoteConn;
    
    console.log(selectConn);
    return axios.get(selectConn);

}

decryptState(incoming) {
    
    const payload = incoming;
    
    Object.keys(payload).forEach(key => {
        var d = key.includes("Date");
        var a = key.includes("At");
        var b = key.includes("By");
        var k = key.includes("key");
        var e = payload[key] === '' ? true : false;
        var l = payload[key].length > 55 ? true : false;
        if (!a && !b && !d && !e && !l && !k) {
            //var keyValue = bcrypt.hashSync(payload[key], 6);
            var decryptedData = CryptoJS.AES.decrypt(payload[key], unlockAll);
            var ciphertext = decryptedData.toString(CryptoJS.enc.Utf8);
        } else {
            var ciphertext = payload[key];
        }
        payload[key] = ciphertext;
      });
    
    console.log(payload);
    return payload
}

    render() {  
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
                   /*
                   const userPaths = {
                    newApp: `../app-new/demouser`,
                    openApp: `../app-open/demouser`,
                    manageApps: `../app-manage/demouser`,
                    manageUsers: `../users/demouser`,
                    newUsers: `../new-user/demouser`,
                    editUsers: `../edit-user/demouser`
                }
                 */
                    if (this.state.usersLoaded === false) { 
                        return (
                            <React.Fragment>
                               <CssBaseline />
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
                                
                                <Spinner/>
                                <div align="center">
                                    <h4>User list loading</h4>
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
                                        <Link className={classes.adminAction}
                                        to={`../home/${this.state.userAlias}`}
                                        >HOME</Link>
                                        <Link className={classes.adminAction}
                                        to={`../`}
                                        >LOGIN</Link>
                                        
                                        </Toolbar>
                                    </AppBar>
                                <div style={{marginTop: 100}}>
                                <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
                                    <Grid item lg={6} className={classes.gridItem}>
                                    <Button className={classes.adminAction} href={`../new-user/${this.state.userAlias}`} variant="contained" color="primary">
                                        Add User
                                    </Button><br/><br/>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                {this.state.headCells.map((headCell) => (
                                                <TableCell
                                                    key={uuidv4()}
                                                    align={headCell.numeric ? 'right' : 'left'}
                                                    padding='default'
                                                >
                                                <b>{headCell.label}</b>
                                                </TableCell>
                                                ))}
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {this.state.receivedUsers.map((row) => (
                                                <TableRow key={uuidv4()}>
                                                <TableCell key={uuidv4()} align="right">{row.core_fname} {row.core_lname}</TableCell>
                                                <TableCell key={uuidv4()} align="right">{row.alias}</TableCell>
                                                <TableCell key={uuidv4()} align="right">{row.core_email}</TableCell>
                                                <TableCell key={uuidv4()} align="right">{row.active}</TableCell>
                                                <TableCell key={uuidv4()} align="right">
                                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                    <Button 
                                                    href={`../edit-user/${this.state.userAlias}/${row.alias}`} 
                                                    mode="edit" >
                                                        <b>Open / Modify</b>
                                                    </Button>
                                                    <Button 
                                                    href={`../new-password/${this.state.userAlias}/${row.alias}`} 
                                                    mode="edit" >
                                                        <b>Change Password</b>
                                                    </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    </Grid>
                                </Grid>  
                                
                                </div>
                            </React.Fragment>
                            )
                    }
                    
                }}
            </Consumer>
        )
    }
}

export default withStyles(styles)(ApplicationList);
