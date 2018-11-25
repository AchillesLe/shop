import React, { Component } from 'react';

//CSS
import './category.css';

import categoryService from './category.service';

const Cookies = require('js-cookie');

class EditCategory extends Component {
    constructor() {
        super();
        this.state = {
            category: {}
        }
        this._categoryService = new categoryService();
    }

    componentDidMount() {
        console.log('EditCategory componentDidMount');
        this.getCategoryById(this.props.match.params.id);
    }

    componentWillUnmount(){
        console.log('EditCategory componentWillUnmount');
        this.props.unmount()
    }

    async getCategoryById(id) {
        await this._categoryService.getCategoryById(id).then((res, error) => {
            this.setState(state => {
                return {
                    ...state,
                    category: res.data[0]
                }
            })
        })
        console.log(this.state.category);
    }

    updateName(e) {
        const value = e.target.value;
        this.setState(state => {
            return {
                ...state,
                category: {
                    ...state.category,
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
                category: {
                    name: ''
                }
            }
        })
    }

    editCategory(idCategory, e) {
        e.preventDefault();

        this._categoryService.editCategory(Cookies.get('token'), { name: this.state.category.name }, idCategory).then((res, error) => {
            console.log(res);

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
            <div className="right_col" role="main">
                <div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Edit</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <br />
                                    <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left" noValidate>
                                        <div className="form-group">
                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                            </label>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <input type="text" id="name" required="required" value={this.state.category.name || ""} onChange={this.updateName.bind(this)} className="form-control col-md-7 col-xs-12" />
                                            </div>
                                        </div>
                                        <div className="ln_solid" />
                                        <div className="form-group">
                                            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                                <button className="btn btn-primary" type="button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                <button className="btn btn-primary" type="reset" onClick={this.resetForm.bind(this)}>Reset</button>
                                                <button type="submit" className="btn btn-success" onClick={this.editCategory.bind(this, this.props.match.params.id)}>Edit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditCategory;