import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import '../../assets/build/css/custom.min.css';

import LeftNav from './navs/left-nav/left-nav';
import TopNav from './navs/top-nav/top-nav';

import Content from './content/content';
import Product from './product/product';

import Footer from './footer/footer';

import LogIn from './log-in/log-in';

const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <div class="container body">
        <div className="main_container">
            <LeftNav></LeftNav>
            <TopNav></TopNav>

            <Component {...props} />

            <Footer></Footer>
        </div>
        </div>
    )} />
)

class Admin extends Component {

    render() {
        document.body.className = 'nav-md';
       
        
        return (
            <Switch>
                <Route exact path={this.props.match.path} component={LogIn} />
                <HomeRoute path={`${this.props.match.path}/home`} component={Content}></HomeRoute>
                <HomeRoute path={`${this.props.match.path}/product`} component={Product}/>
            </Switch>
            
        )
    }
}

export default Admin;