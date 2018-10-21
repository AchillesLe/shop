import React, { Component } from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

//CSS
import './category.css';

import $ from 'jquery';
import categoryService from './category.service';
const jsonData = require('./category.json');

const Cookies = require('js-cookie');

class Category extends Component {

    constructor() {
        super();
        this.reload();
        this._categoryService = new categoryService();
        console.log(Object.prototype.toString.call(jsonData));
    }

    componentDidUpdate() {
        console.log('Category DidUpdate');
        this.reload();
    }

    reload() {
        if (Cookies.get('previousUrl') !== window.location.href) {
            window.location.reload();
            Cookies.set('previousUrl', window.location.href, { path: '/' });
        }
    }

    render() {
        let tmp = [];
        jsonData.map((item) => {
            tmp.push({"Name": item.Name});
        })
        
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
                                                Category Overview
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tmp.map((item, i) => {
                                                        return [
                                                            <tr key={i}>
                                                                <td>{item['Name']}</td>
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

export default Category;