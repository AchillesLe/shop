/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//CSS
import './user.css';

//JS
import $ from 'jquery';

import {
    Route,
    Switch
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import userService from './user.service';
import EditUser from './editUser';
import AddUser from './addUser';

import defaultImage from "./../../../assets/images/app/default-placeholder.png";

import formatPrice from './../../../share/services/formatPrice';

const moment = require('moment');

const Cookies = require('js-cookie');

class User extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
        this._userService = new userService();
    }

    componentDidMount() {
        console.log('User componentDidMount');
        this.getUsers();
    }

    reloadLibs() {
        console.log('User reloadLibs');

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

    async getUsers() {
        await this._userService.getUsers(Cookies.get('token')).then(res => {
            this.setState(state => {
                return {
                    ...state,
                    users: res.data
                }
            }, () => {
                console.log(this.state.users);
                this.reloadLibs();
            })
        })
    }

    updateUsers() {
        this.getUsers();
    }

    deleteUser(idUser, e) {
        e.preventDefault();

        this._userService.deleteUser(Cookies.get('token'), idUser).then((res, error) => {
            console.log(res);
            if (res && res.status === 200) {
                NotificationManager.success('Delete user success!', 'Success');
            }

            this.setState(state => {
                const indexPosition = state.users.findIndex(item => {
                    return item.iduser.toString() === idUser;
                })

                console.log(indexPosition);
                state.users.splice(indexPosition, 1);
                console.log(state.users);
                return {
                    ...state,
                    users: state.users
                }
            })
        }).catch((e) => {
            if (e && e.response) {
                console.log(e.response);
                if (e.response.status === 400) {
                    if (e.response.data && e.response.data.Message) {
                        if (e.response.data.Message === "Username đã tồn tại !") {
                            NotificationManager.error("Username already existed!", 'Error');
                        } else if (e.response.data.Message === "CMND đã tồn tại !") {
                            NotificationManager.error("Identity Card already existed!", 'Error');
                        } else {
                            NotificationManager.error('Delete user fail!', 'Error');
                        }
                    } else {
                        NotificationManager.error('Delete user fail!', 'Error');
                        // this.props.history.push('/admin')
                    }
                }
            } else {
                e && console.log(e);
                NotificationManager.error('Something\' wrong!', 'Error');
            }
        })
    }


    render() {
        let user = {};
        let isAdmin = false;

        const isHaveUser = Cookies.get('user');
        isHaveUser && (() => {
            user = JSON.parse(Cookies.get('user'))

            user.data.User.role === 1 && (isAdmin = true);
            console.log(user.data.User);
        })();

        !isAdmin && (() => {
            NotificationManager.error("Don't have permission to access this page!", "Error");
            this.props.history.goBack();
        })();

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
                                                User Overview
                                            </h2>
                                            <div className="colLine"></div>
                                            <Link to="/admin/user/create-new" className="btn btn-success">
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
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Username</th>
                                                        <th>Role</th>
                                                        <th>Phone</th>
                                                        <th>Address</th>
                                                        <th>Identity Card</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.users.map((item, i) => {
                                                        return [
                                                            <tr key={"user" + i.toString()}>
                                                                <td>{item['iduser']}</td>
                                                                <td>{item['fullname']}</td>
                                                                <td>{item['username']}</td>
                                                                <td>{item['role'] === 1 ? "Admin" : "User"}</td>
                                                                <td>{item['phone']}</td>
                                                                <td>{item['address']}</td>
                                                                <td>{item['cmnd']}</td>
                                                                <td>
                                                                    <Link to={"/admin/user/edit/" + item['iduser'].toString()} className="btn btn-primary">Edit</Link>
                                                                    <button className="btn btn-primary" onClick={this.deleteUser.bind(this, item['iduser'].toString())}>Delete</button>
                                                                </td>
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

                <Route path={`${this.props.match.path}/create-new`} render={props => <AddUser {...props} unmount={this.updateUsers.bind(this)}></AddUser>} />
                <Route path={`${this.props.match.path}/edit/:id`} render={props => <EditUser {...props} unmount={this.updateUsers.bind(this)}></EditUser>} />
            </Switch>
        )
    }
}

export default User;