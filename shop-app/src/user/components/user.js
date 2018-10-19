import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './user.css';
import './../../assets/user/img/core-img/favicon.ico'
import './../../assets/user/css/core-style.css'
import './../../assets/user/style.css'

import NavBar from './nav/NavBar';
import {Footer} from './nav/Footer';
import {GoTop} from './nav/GoTop';
import Home from './page/Home';
import ProductPage from './page/ProductPage';


const HomeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div>
        <NavBar />
        <Component {...props} />
        <Footer />
        <GoTop/>
      </div>
    )}
  />
);

class User extends Component {

    render() {
        document.body.className = '';
        return (
            <Switch>
                <HomeRoute exact path={`${this.props.match.path}`} component={Home} />
                <HomeRoute path={`${this.props.match.path}san-pham`} component={ProductPage}/>
            </Switch>
        )
    }
}

export default User;