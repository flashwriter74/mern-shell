import React, { Component } from "react"; 
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_PROFILE':
        return {
            ...state,
            userProfile: action.payload.profile,
            token: action.payload.token
        };

        case 'SET_SESSION':
        return {
            ...state,
            userSession: action.payload,
        };

        case 'SET_ORG':
        return {
            ...state,
            orgRoles: action.payload,
        };

        default: 
            return state;
    }
}

export class Provider extends Component {
  state = {
      userProfile: {},
      token: '',
      userSession: {},
      orgSettings: {},
      dispatch: action => this.setState(state => reducer (state, action))
  }

  componentDidMount() {
    
        
  }

  getProfileUpdates() {
    axios.get(`http://cors-anywhere.herokuapp.com/`)
        .then(res => {
           // console.log(res.data);
            
            this.setState({
                track_list: res.data.message.body.track_list
            })
            //console.log("new state");
            //console.log(this.state.track_list);
        })
        .catch(err => console.log(err))
  }
  
    render() {
    return (
        //can pass one or more props via our provider
     <Context.Provider value={this.state}>
         {this.props.children}
     </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer