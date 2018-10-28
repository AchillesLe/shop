import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Route,
    Switch
} from 'react-router-dom';

//CSS
import './category.css';

import $ from 'jquery';
import categoryService from './category.service';

const Cookies = require('js-cookie');

class Category extends Component {

    constructor() {
        super();
        this.state = {
            category: [],
            createNew: {
                name: ''
            }
        }
        this._categoryService = new categoryService();
        this._categoryService.getCategory().then(res => {
            this.setState(state => {
                return {
                    ...state,
                    category: res.data
                }
            })
            setTimeout(() => {
                console.log(this.state.category);
            })
        })
    }

    componentDidUpdate() {
        console.log('Category componentDidUpdate');
        this.reloadLibs();
    }

    reloadLibs(){
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

    updateName(e) {
        const value = e.target.value;
        this.setState(state => {
            return {
                ...state,
                createNew: {
                    ...state.createNew,
                    name: value
                }
            }
        })
    }

    cancel() {
        this.props.history.push('/admin/category');
    }

    resetForm() {
        this.setState(state => {
            return {
                ...state,
                createNew: {
                    name: ''
                }
            }
        })
    }

    createCategory(e) {
        e.preventDefault();

        this._categoryService.addCategory(Cookies.get('token'), this.state.createNew).then((res, error) => {
            console.log(res);
            console.log(error);
            console.log("res");
            this.setState(state => {
                return {
                    ...state,
                    category: [...state.category, res.data],
                    createNew: {
                        name: ''
                    }
                }
            })

            setTimeout(() => {
                console.log(this.state);
            })
            this.props.history.push('/admin/category');
        }).catch((e) => {
            console.log(e.response);
            if (e.response.status === 400) {
                this.props.history.push('/admin')
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path={this.props.match.path} render={() => (
                    <div className="right_col" role="main">
                        <div>
                            <div className="page-title">
                                <div className="title_left">
                                    <Link to="/admin/category/create-new" className="category__create-new">
                                        <h3>Create New</h3>
                                    </Link>
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
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.category.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{item['idCategory']}</td>
                                                                <td>{item['name']}</td>
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
                                                        <input type="text" id="name" required="required" value={this.state.createNew.name} onChange={this.updateName.bind(this)} className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="ln_solid" />
                                                <div className="form-group">
                                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                                        <button className="btn btn-primary" type="button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                        <button className="btn btn-primary" type="reset" onClick={this.resetForm.bind(this)}>Reset</button>
                                                        <button type="submit" className="btn btn-success" onClick={this.createCategory.bind(this)}>Create</button>
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