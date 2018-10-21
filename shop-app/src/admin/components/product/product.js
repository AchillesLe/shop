import React, { Component } from 'react';

//JS
import $ from 'jquery';

import {
    Route,
    Switch
} from 'react-router-dom';

const jsonData = require('./product.json')

const Cookies = require('js-cookie');

class Product extends Component {

    constructor() {
        super();
        this.reload();
    }

    componentDidUpdate() {
        console.log('Product DidUpdate');
        this.reload();
    }

    reload() {
        if (Cookies.get('previousUrl') !== window.location.href) {
            window.location.reload();
            Cookies.set('previousUrl', window.location.href, { path: '/' });
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path={this.props.match.path} render={() => (
                    <div className="right_col" role="main">
                        <div>
                            <div className="page-title">
                                <div className="title_left">
                                    <a className="category__create-new">
                                        <h3> Create New </h3>
                                    </a>
                                </div>
                            </div>
                            <div className="clearfix" />

                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="x_panel">
                                        <div className="x_title">
                                            <h2>
                                                Product Overview
                                        </h2>
                                            <div className="clearfix" />
                                        </div>
                                        <div className="x_content">
                                            <table
                                                id="datatable"
                                                className="table table-striped table-bordered"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Price</th>
                                                        <th>Made in</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {jsonData.map((item, i) => {
                                                        return [
                                                            <tr key={i}>
                                                                <td>{item['Name']}</td>
                                                                <td>{item['Category']}</td>
                                                                <td>{item['Price']}</td>
                                                                <td>{item['Made in']}</td>
                                                                <td>{item['Quantity']}</td>
                                                            </tr>

                                                        ];
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
                <Route path={`${this.props.match.path}/create-new`} render={() => (
                    <div className="right_col" role="main">
                        <div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="x_panel">
                                        <div className="x_title">
                                            <h2>Create New</h2>
                                            <div className="clearfix" />
                                        </div>
                                        <div className="x_content">
                                            <br />
                                            <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left" noValidate>
                                                <div className="form-group">
                                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <input type="text" id="name" required="required" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="category">Category <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <input type="text" id="category" name="category" required="required" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price" className="control-label col-md-3 col-sm-3 col-xs-12">Price</label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <input id="price" className="form-control col-md-7 col-xs-12" type="text" name="price" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="made-in" className="control-label col-md-3 col-sm-3 col-xs-12">Made in</label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <input id="made-in" className="form-control col-md-7 col-xs-12" type="text" name="made-in" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quantity" className="control-label col-md-3 col-sm-3 col-xs-12">Quantity</label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <input id="quantity" className="form-control col-md-7 col-xs-12" type="text" name="quantity" />
                                                    </div>
                                                </div>
                                                <div className="ln_solid" />
                                                <div className="form-group">
                                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                                        <button className="btn btn-primary" type="button">Cancel</button>
                                                        <button className="btn btn-primary" type="reset">Reset</button>
                                                        <button type="submit" className="btn btn-success">Create</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )} />
            </Switch>
        )
    }
}

export default Product;