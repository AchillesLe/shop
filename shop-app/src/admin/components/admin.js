import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

//CSS
import './admin.css';

//JS
import $ from 'jquery';

import LeftNav from './navs/left-nav/left-nav';
import TopNav from './navs/top-nav/top-nav';

import Content from './content/content';
import Product from './product/product';
import Category from './category/category';

import Footer from './footer/footer';

import LogIn from './log-in/log-in';

const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <div className="main_container">
            <LeftNav></LeftNav>
            <TopNav></TopNav>

            <Component {...props} />

            <Footer></Footer>
        </div>
    )} />
)

class Admin extends Component {

    componentDidMount() {
        console.log('Admin Did Mount');
        $(document).ready(() => {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '../vendors/js/libs.js';

            var currentScript = $('body').find('script[src="../vendors/js/libs.js"]');
            if (currentScript) {
                currentScript.remove();
            }

            body.appendChild(script);
        })
    }

    render() {
        document.body.className = 'nav-md';

        return (
            <Switch>
                <Route exact path={this.props.match.path} component={LogIn} />
                <HomeRoute path={`${this.props.match.path}/home`} component={Content}></HomeRoute>
                <HomeRoute path={`${this.props.match.path}/product`} component={Product}/>
                <HomeRoute path={`${this.props.match.path}/category`} component={Category}/>
            </Switch>
        )
    }
}

export default Admin;