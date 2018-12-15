import React, { Component } from 'react';

//CSS
import './user.css';

//JS
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';

import userService from './user.service';
import { Form, Text, Select, Option } from 'informed';

import defaultImage from "./../../../assets/images/app/default-placeholder.png";

const Cookies = require('js-cookie');

class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            user: {
            }
        }
        this._userService = new userService();
    }

    componentWillUnmount() {
        console.log('AddUser componentWillUnmount');
        this.props.unmount();
    }

    componentDidMount() {
        console.log('AddUser componentDidMount');
    }

    cancel() {
        this.props.history.push('/admin/user');
    }

    resetForm() {
        this.setState(state => {
            return {
                ...state,
                user: {
                }
            }
        })
    }

    async addUser(e) {
        e.preventDefault();
        this.refs.addUserButton.setAttribute("disabled", "disabled");

        console.log('addUser', this.state.user);

        this._userService.addUser(Cookies.get('token'), this.state.user).then((res, error) => {
            console.log(res);
            if (res && res.status === 200) {
                NotificationManager.success('Add user success!', 'Success');
            }

            this.props.history.push('/admin/user');
        }).catch((e) => {
            this.refs.addUserButton.removeAttribute("disabled");

            if (e && e.response) {
                console.log(e.response);
                if (e.response.status === 400) {
                    if (e.response.data && e.response.data.Message) {
                        if(e.response.data.Message === "Username đã tồn tại !") {
                            NotificationManager.error("Username already existed!", 'Error');
                        } else if(e.response.data.Message === "CMND đã tồn tại !"){
                            NotificationManager.error("Identity Card already existed!", 'Error');
                        }
                    } else {
                        NotificationManager.error('Unauthorized!', 'Error');
                        // this.props.history.push('/admin')
                    }
                }
            } else {
                e && console.log(e);
                NotificationManager.error('Something wrong!', 'Error');
            }
        })
    }

    formChange(formState) {
        this.setState(state => {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...formState.values
                }
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
                                    <h2>Create User</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <br />
                                    <Form className="form-horizontal form-label-left" onChange={this.formChange.bind(this)}>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="fullname">Full Name <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text field="fullname" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="username">Username <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text field="username" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password" className="control-label col-md-2 col-sm-2 col-xs-12">Password <span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text type="password" field="password" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="retypePassword" className="control-label col-md-2 col-sm-2 col-xs-12">Retype Password <span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text type="password" field="retypePassword" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="role" className="control-label col-md-2 col-sm-2 col-xs-12">Role <span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Select field="role" className="form-control col-md-7 col-xs-12" value="0">
                                                            <Option key="0" value="0">
                                                                User
                                                            </Option>
                                                            <Option key="1" value="1">
                                                                Admin
                                                            </Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cmnd" className="control-label col-md-2 col-sm-2 col-xs-12">Identity Card<span className="required">*</span></label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text field="cmnd" className="form-control col-md-7 col-xs-12" maxLength="10"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone" className="control-label col-md-2 col-sm-2 col-xs-12">Phone</label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text field="phone" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address" className="control-label col-md-2 col-sm-2 col-xs-12">Address</label>
                                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                                        <Text field="address" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ln_solid" />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-2">
                                                        <button className="btn btn-primary" type="button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                        <button className="btn btn-primary" type="reset" onClick={this.resetForm.bind(this)}>Reset</button>
                                                        <button type="submit" ref="addUserButton" className="btn btn-success" onClick={this.addUser.bind(this)}>Create</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUser;