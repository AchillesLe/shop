import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

//CSS
import './admin.css';

//JS
import $ from 'jquery';
import axios from 'axios';
import createBrowserHistory from 'history/createBrowserHistory';

import LeftNav from './navs/left-nav/left-nav';
import TopNav from './navs/top-nav/top-nav';

import Content from './content/content';
import Product from './product/product';
import Category from './category/category';

import Footer from './footer/footer';

import LogIn from './log-in/log-in';
import AdminContext from './admin.context';

const Cookies = require('js-cookie');

const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <div className="main_container">
            <LeftNav {...{ history: props.history }}></LeftNav>
            <TopNav {...{ history: props.history }}></TopNav>

            <Component {...props} />

            <Footer></Footer>
        </div>
    )} />
)

class Admin extends Component {
    constructor() {
        super();

        if(Cookies.get('user')){
            console.log(JSON.parse(Cookies.get('user')));
            this.state = {
                user: JSON.parse(Cookies.get('user')),
                toggleNavs: false,
                setUser: this.setUser,
                reRenderNavs: this.reRenderNavs,
                history: createBrowserHistory()
            };
        } else {
            this.state = {
                user: {},
                toggleNavs: false,
                setUser: this.setUser,
                reRenderNavs: this.reRenderNavs,
                history: createBrowserHistory()
            };
        }
        console.log(Cookies.get('token'))
    }

    setUser = user => {
        this.setState({ user });
    }


    componentDidMount() {
        console.log('Admin Did Mount');
        $(document).ready(() => {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '/vendors/js/libs.js';

            var currentScript = $('body').find('script[src="../vendors/js/libs.js"]');
            if (currentScript) {
                currentScript.remove();
            }

            body.appendChild(script);

            $(window).on('load', () => {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/vendors/css/libs.css';

                var currentLink = $('body').find('link[href="../vendors/css/libs.css"]');
                if (currentLink) {
                    currentLink.remove();
                }

                head.appendChild(link);
            });

            //remove conflict css
            $('style[type="text/css"]').each(function () {
                if ($(this).text().includes('Bootstrap v4.1.0')) {
                    console.log('_______________________');
                    console.log('remove conflict css');
                    console.log(this);
                    console.log('_______________________');
                    $(this).remove();
                }
            });
        })
    }

    render() {
        document.body.className = 'nav-md';
        $('#root').addClass('container body');
        let history = this.state.history;

        return (
            <AdminContext.Provider value={this.state}>
                <Switch>
                    <Route exact path={this.props.match.path} history={history} component={LogIn} />
                    <HomeRoute path={`${this.props.match.path}/home`} history={history} component={Content} />
                    <HomeRoute path={`${this.props.match.path}/product`} history={history} component={Product} />
                    <HomeRoute path={`${this.props.match.path}/category`} history={history} component={Category} />
                </Switch>
            </AdminContext.Provider>
        )
    }
}

export default Admin;