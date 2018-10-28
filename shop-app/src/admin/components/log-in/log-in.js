import React, { Component } from 'react';

import LogInService from './log-in.service';
import AdminContext from '../admin.context';
const Cookies = require('js-cookie');

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                username: '',
                password: ''
            }
        }

        this._logInService = new LogInService();
    }

    componentDidMount(){
        if (Cookies.get('user')) {
            this.props.history.push('/admin/product');
        }
    }

    updateUsername(e) {
        const value = e.target.value;
        this.setState(state => {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    username: value
                }
            };
        })
    }

    updatePassword(e) {
        const value = e.target.value;
        this.setState(state => {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    password: value
                }
            };
        })
    }

    submit(callback, e) {
        e.preventDefault();

        this._logInService.logIn(this.state.userInfo).then((res) => {
            console.log(res.data.token);
            callback(res);
            Cookies.set('token', res.data.token, { expires: 0.02 });
            Cookies.set('user', res, { expires: 0.02 });
            this.props.history.push('/admin/product');
        });

    }

    render() {
        document.body.className = 'login';

        return (
            <AdminContext.Consumer>
                {({ user, setUser }) => (
                    <div>
                        <a className="hiddenanchor" id="signup" />
                        <a className="hiddenanchor" id="signin" />
                        <div className="login_wrapper">
                            <div className="animate form login_form">
                                <section className="login_content">
                                    <form>
                                        <h1>Login</h1>
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                required
                                                value={this.state.userInfo.username}
                                                onChange={this.updateUsername.bind(this)}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                                value={this.state.userInfo.password}
                                                onChange={this.updatePassword.bind(this)}
                                            />
                                        </div>
                                        <div>
                                            <a className="btn btn-default submit" href="#" onClick={this.submit.bind(this, setUser.bind(this))}>
                                                Log in
                                            </a>
                                        </div>
                                        <div className="clearfix" />
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                )}
            </AdminContext.Consumer>

        )
    }
}

export default LogIn;