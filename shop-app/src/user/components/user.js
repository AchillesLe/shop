import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery'
import {route} from './../../config'
import './user.css';
import 'react-notifications/lib/notifications.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './../../assets/user/img/core-img/favicon.ico'
import './../../assets/user/css/core-style.css'
import './../../assets/user/style.css'

import NavBar from './nav/NavBar';
import {Footer} from './nav/Footer';
import {GoTop} from './nav/GoTop';
import Home from './page/Home';
import ProductPage from './page/ProductPage';
import ProductDetailPage from './page/ProductDetailPage';
import CheckoutPage from "./page/CheckoutPage";
import ContactPage from "./page/ContactPage";
import { RightCart } from './cart/RightCart';
import { CartProvider } from './context/CartContext';
import { ProducProvider } from './context/ProductContext';


const HomeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    <ProducProvider>
      <CartProvider>
        <NavBar />
        <RightCart/>
        <Component {...props} />
        <Footer />
        <GoTop/>
      </CartProvider>
    </ProducProvider>
    )}
  />
);

class User extends Component {
    componentDidMount(){
        $("#root").removeClass('container body').addClass('user-component');
    }
    render() {
        return (
            <Switch>
                <HomeRoute exact path={`${this.props.match.path}`} component={Home} />
                <HomeRoute path={`${this.props.match.path}${route.product}`} component={ProductPage}/>
                <HomeRoute path={`${this.props.match.path}${route.detail}`} component={ProductDetailPage}/>
                <HomeRoute path={`${this.props.match.path}${route.checkout}`} component={CheckoutPage} />
                <HomeRoute path={`${this.props.match.path}${route.contact}`} component={ContactPage} />
            </Switch>
        )
    }
}

export default User;