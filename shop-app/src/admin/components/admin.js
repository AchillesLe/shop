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

const Cookies = require('js-cookie');

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
    constructor() {
        super();
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
            $('style[type="text/css"]').each(function() {
                if($(this).text().includes('Bootstrap v4.1.0')) {
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

        return (
            <Switch>
                <Route exact path={this.props.match.path} component={LogIn} />
                <HomeRoute path={`${this.props.match.path}/home`} onChange={this.reload} component={Content} />
                <HomeRoute path={`${this.props.match.path}/product`} onChange={this.reload} component={Product} />
                <HomeRoute path={`${this.props.match.path}/category`} onChange={this.reload} component={Category} />
            </Switch>

        )
    }
}

export default Admin;