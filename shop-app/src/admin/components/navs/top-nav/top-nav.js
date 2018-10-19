import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img from '../../../../assets/images/img.jpg';

class TopNav extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                isActive: false
            }
        }
    }

    toggleUser() {
        this.setState({
            user: {
                isActive: !this.state.active
            }
        })
    }

    render() {
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <nav>
                        <div className="nav toggle">
                            <a id="menu_toggle"><i className="fa fa-bars" /></a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li className={this.state.user.isActive ? "open" : ""}>
                                <a onClick={this.toggleUser.bind(this)} className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <img src={img} alt="Profile"/>John Doe
                                    <span className=" fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu dropdown-usermenu pull-right">
                                    <li><a href="#"> Profile</a></li>
                                    <li>
                                        <a href="#">
                                            <span className="badge bg-red pull-right">50%</span>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li><a href="#">Help</a></li>
                                    <li><Link to="/admin"><i className="fa fa-sign-out pull-right" /> Log Out</Link></li>
                                </ul>
                            </li>
                            <li role="presentation" className="dropdown">
                                <a className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-envelope-o" />
                                    <span className="badge bg-green">6</span>
                                </a>
                                <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                                    <li>
                                        <a>
                                            <span className="image"><img src={img} alt="Profile" /></span>
                                            <span>
                                                <span>John Smith</span>
                                                <span className="time">3 mins ago</span>
                                            </span>
                                            <span className="message">
                                                Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="image"><img src={img} alt="Profile" /></span>
                                            <span>
                                                <span>John Smith</span>
                                                <span className="time">3 mins ago</span>
                                            </span>
                                            <span className="message">
                                                Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="image"><img src={img} alt="Profile" /></span>
                                            <span>
                                                <span>John Smith</span>
                                                <span className="time">3 mins ago</span>
                                            </span>
                                            <span className="message">
                                                Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="image"><img src={img} alt="Profile"/></span>
                                            <span>
                                                <span>John Smith</span>
                                                <span className="time">3 mins ago</span>
                                            </span>
                                            <span className="message">
                                                Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="text-center">
                                            <a>
                                                <strong>See All Alerts</strong>
                                                <i className="fa fa-angle-right" />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        )
    }
}

export default TopNav;