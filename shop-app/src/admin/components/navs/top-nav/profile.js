import React, { Component } from 'react';

//CSS
import '../../user/user.css';

//JS
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';

import userService from '../../user/user.service';
import { Form, Text, Select, Option } from 'informed';

const Cookies = require('js-cookie');

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {
            }
        }
        this._userService = new userService();
    }

    componentWillMount() {
        console.log('Profile componentWillMount');

        this.getUserById(this.props.match.params.id);
    }

    async getUserById(id) {
        await this._userService.getUserById(Cookies.get('token'), id).then((res, error) => {
            this.setState(state => {
                return {
                    ...state,
                    user: res.data || {},
                }
            })
        })
        console.log(this.state.user);
    }

    async editUser(iduser, e) {
        e.preventDefault();
        this.refs.editUserButton.setAttribute("disabled", "disabled");

        console.log('editUser', this.state.user, iduser);

        this._userService.editUser(Cookies.get('token'), this.state.user, iduser).then((res, error) => {
            console.log(res);
            if (res && res.status === 200) {
                this.refs.editUserButton.removeAttribute("disabled");
                
                NotificationManager.success('Save success!', 'Success');
            }

        }).catch((e) => {
            this.refs.editUserButton.removeAttribute("disabled");

            if (e && e.response) {
                console.log(e.response);
                if (e.response.status === 400) {
                    if (e.response.data && e.response.data.Message) {
                        if (e.response.data.Message === "Bạn không đủ quyền cho hành động này !") {
                            NotificationManager.error("Don't have permission!", 'Error');
                        } else if (e.response.data.Message === "CMND đã tồn tại !") {
                            NotificationManager.error("Identity Card already existed!", 'Error');
                        } else {
                            NotificationManager.error('Save fail!', 'Error');
                        }
                    } else {
                        NotificationManager.error('Save fail!', 'Error');
                    }
                }
            } else {
                e && console.log(e);
                NotificationManager.error('Something\' wrong!', 'Error');
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
                                    <h2>Profile</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <br />
                                    {
                                        this.state.user && Object.keys(this.state.user).length === 0 ? "" :
                                            <Form className="form-horizontal form-label-left" onChange={this.formChange.bind(this)}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="fullname">Full Name <span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text field="fullname" className="form-control col-md-7 col-xs-12" initialValue={this.state.user.fullname}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="username">Username <span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="username" className="form-control col-md-7 col-xs-12" initialValue={this.state.user.username}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password" className="control-label col-md-2 col-sm-2 col-xs-12">Password <span className="required">*</span></label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text type="password" field="password" className="form-control col-md-7 col-xs-12" initialValue={this.state.user.password}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="retypePassword" className="control-label col-md-2 col-sm-2 col-xs-12">Retype Password <span className="required">*</span></label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text type="password" field="retypePassword" className="form-control col-md-7 col-xs-12" initialValue={this.state.user.password}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="cmnd" className="control-label col-md-2 col-sm-2 col-xs-12">Identity Card<span className="required">*</span></label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text field="cmnd" className="form-control col-md-7 col-xs-12" maxLength="10" initialValue={this.state.user.cmnd}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="phone" className="control-label col-md-2 col-sm-2 col-xs-12">Phone</label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text field="phone" className="form-control col-md-7 col-xs-12" initialValue={this.state.user.phone}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address" className="control-label col-md-2 col-sm-2 col-xs-12">Address</label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text field="address" className="form-control col-md-7 col-xs-12" initialValue={this.state.user.address}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ln_solid" />
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-2">
                                                                <button type="submit" ref="editUserButton" className="btn btn-success" onClick={this.editUser.bind(this, this.state.user.iduser)}>Save Changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;