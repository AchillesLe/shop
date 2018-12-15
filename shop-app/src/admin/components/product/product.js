/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//CSS
import './product.css';

//JS
import $ from 'jquery';

import {
    Route,
    Switch
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import productService from './product.service';
import EditProduct from './editProduct';
import AddProduct from './addProduct';

import defaultImage from "./../../../assets/images/app/default-placeholder.png";

import formatPrice from './../../../share/services/formatPrice';

const moment = require('moment');

const Cookies = require('js-cookie');

class Product extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        }
        this._productService = new productService();
    }

    componentDidMount() {
        console.log('Product componentDidMount');
        this.getProducts();
    }

    reloadLibs() {
        console.log('Product reloadLibs');

        $(document).ready(() => {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '/vendors/js/libs.js';

            var currentScript = $('body').find('script[src="/vendors/js/libs.js"]');
            if (currentScript) {
                currentScript.remove();
            }

            body.appendChild(script);

            $(window).on('load', () => {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/vendors/css/libs.css';

                var currentLink = $('head link[href="/vendors/css/libs.css"]');
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

    async getProducts() {
        await this._productService.getProducts().then(res => {
            this.setState(state => {
                return {
                    ...state,
                    products: res.data.list
                }
            }, () => {
                console.log(this.state.products);
                this.reloadLibs();
            })
        })
    }

    updateProducts() {
        this.getProducts();
    }

    deleteProduct(idProduct, e) {
        e.preventDefault();

        this._productService.deleteProduct(Cookies.get('token'), idProduct).then((res, error) => {
            console.log(res);
            if (res && res.status === 200) {
                NotificationManager.success('Delete product success!', 'Success');
            }


            this.setState(state => {
                const indexPosition = state.products.findIndex(item => {
                    return item.idProduct.toString() === idProduct;
                })

                console.log(indexPosition);
                state.products.splice(indexPosition, 1);
                console.log(state.products);
                return {
                    ...state,
                    products: state.products
                }
            })
        }).catch((e) => {
            if (e && e.response) {
                console.log(e.response);
                NotificationManager.error('Delete product fail!', 'Error');
            } else {
                e && console.log(e);
                NotificationManager.error('Something\' wrong!', 'Error');
            }
        })
    }


    render() {
        return (
            <Switch>
                <Route exact path={this.props.match.path} render={() => (
                    <div className="right_col" role="main">
                        <div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="x_panel">
                                        <div className="x_title">
                                            <h2>
                                                Product Overview
                                            </h2>
                                            <div className="colLine"></div>
                                            <Link to="/admin/product/create-new" className="btn btn-success">
                                                <h5>Create New</h5>
                                            </Link>
                                            <div className="clearfix" />
                                        </div>
                                        <div className="x_content">
                                            <table
                                                id="datatable"
                                                className="table table-striped table-bordered"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Avatar</th>
                                                        <th>Code</th>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Made in</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Create Date</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.products.map((item, i) => {
                                                        return (
                                                            <tr key={"product" + i.toString()}>
                                                                <td>
                                                                    <div className="cell-image">
                                                                        <img alt="Avatar" src={item['avatar'] && item['avatar'] !== null ? item['avatar'] : defaultImage}></img>
                                                                    </div>
                                                                </td>
                                                                <td>{item['code']}</td>
                                                                <td>{item['name']}</td>
                                                                <td>{item['categoryName']}</td>
                                                                <td>{item['madein']}</td>
                                                                <td>{formatPrice(item['priceOut']) + ' VND'}</td>
                                                                <td>{item['quantity']}</td>
                                                                <td>{moment(item['createdDate']).format('DD/MM/YYYY h:mm:ss a')}</td>
                                                                <td>
                                                                    <Link to={"/admin/product/edit/" + item['idProduct'].toString()} className="btn btn-primary">Edit</Link>
                                                                    <button className="btn btn-primary" onClick={this.deleteProduct.bind(this, item['idProduct'].toString())}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )} />

                <Route path={`${this.props.match.path}/create-new`} render={props => <AddProduct {...props} unmount={this.updateProducts.bind(this)}></AddProduct>} />
                <Route path={`${this.props.match.path}/edit/:id`} render={props => <EditProduct {...props} unmount={this.updateProducts.bind(this)}></EditProduct>} />
            </Switch>
        )
    }
}

export default Product;