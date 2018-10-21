import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery'
import {route} from './../../config'
import './user.css';
import './../../assets/user/img/core-img/favicon.ico'
import './../../assets/user/css/core-style.css'
import './../../assets/user/style.css'

import NavBar from './nav/NavBar';
import {Footer} from './nav/Footer';
import {GoTop} from './nav/GoTop';
import Home from './page/Home';
import ProductPage from './page/ProductPage';
import ProductDetailPage from './page/ProductDetailPage';
import { RightCart } from './cart/RightCart';
import { CartProvider } from './context/CartContext';

const vendorJS = [
  './js/jquery/jquery-2.2.4.min.js',
  './js/popper.min.js',
  './js/bootstrap.min.js',
  './js/plugins.js',
  './js/classy-nav.min.js',
  './js/active.js'
]

const HomeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <CartProvider>
        <NavBar />
        <RightCart/>
        <Component {...props} />
        <Footer />
        <GoTop/>
      </CartProvider>
    )}
  />
);
const renderScript = ()=>{
  return vendorJS.map((script)=>{return $('body').append('<script src='+script+'></script>')})
}
class User extends Component {
    componentDidMount(){
      $(document).ready(()=>{
        renderScript();
        $("#root").removeClass('container body').addClass('user-component');
      })
    }
    render() {
        return (
            <Switch>
                <HomeRoute exact path={`${this.props.match.path}`} component={Home} />
                <HomeRoute path={`${this.props.match.path}${route.product}/:id?`} component={ProductPage}/>
                <HomeRoute path={`${this.props.match.path}${route.detail}`} component={ProductDetailPage}/>
            </Switch>
        )
    }
}

export default User;