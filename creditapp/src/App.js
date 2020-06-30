import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//import ReactDOM from 'react-dom';
import './App.css';
import UserLogin from './components/user-login';
import AppHome from './components/AppsHome';
import UserList from './components/UserList';
import UserNew from './components/user-new';
import UserEdit from './components/user-edit';
import ChangePassword from "./components/new-password";
import {Provider} from "./context";

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
        <Route path="/" exact component={UserLogin} />
        <Route path="/home/:id" component={AppHome} />
        <Route path="/users/:id" component={UserList} />
        <Route path="/new-user/:id" component={UserNew} />
        <Route path="/edit-user/:id/:uid" component={UserEdit} />
        <Route path="/new-password/:id/:uid" component={ChangePassword} />

        </Switch>
      </Router>
    </Provider>
  );
}

//ReactDOM.render(<App />, document.querySelector('#app'));
export default App;
