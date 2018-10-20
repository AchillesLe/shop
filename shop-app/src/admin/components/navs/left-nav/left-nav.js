import React, { Component } from 'react';
import img from '../../../../assets/images/img.jpg';

import { Link } from 'react-router-dom';

import $ from 'jquery';

class LeftNav extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{ border: 0 }}>
                        <Link to="/admin/home" className="site_title"><i className="fa fa-paw" /> <span>Gentelella Alela!</span></Link>
                    </div>
                    <div className="clearfix" />
                    {/* menu profile quick info */}
                    <div className="profile clearfix">
                        <div className="profile_pic">
                            <img src={img} alt="..." className="img-circle profile_img" />
                        </div>
                        <div className="profile_info">
                            <span>Welcome,</span>
                            <h2>John Doe</h2>
                        </div>
                    </div>
                    {/* /menu profile quick info */}
                    <br />
                    {/* sidebar menu */}
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section">
                            <h3>General</h3>
                            <ul className="nav side-menu">
                                <li><a><i className="fa fa-home" /> Product <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu">
                                        <li><Link to="/admin/product">Overview</Link></li>
                                        <li><a href="index2.html">Create New</a></li>
                                    </ul>
                                </li>
                                <li><a><i className="fa fa-home" /> Category <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu">
                                        <li><Link to="/admin/category">Overview</Link></li>
                                        <li><a href="index2.html">Create New</a></li>
                                    </ul>
                                </li>
                                <li><a><i className="fa fa-home" /> Home <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu">
                                        <li><a href="index.html">Dashboard</a></li>
                                        <li><a href="index2.html">Dashboard2</a></li>
                                        <li><a href="index3.html">Dashboard3</a></li>
                                    </ul>
                                </li>
                                <li><a><i className="fa fa-home" /> Home <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu">
                                        <li><a href="index.html">Dashboard</a></li>
                                        <li><a href="index2.html">Dashboard2</a></li>
                                        <li><a href="index3.html">Dashboard3</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* /sidebar menu */}
                    {/* /menu footer buttons */}
                    <div className="sidebar-footer hidden-small">
                        <a data-toggle="tooltip" data-placement="top" title="Settings">
                            <span className="glyphicon glyphicon-cog" aria-hidden="true" />
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                            <span className="glyphicon glyphicon-fullscreen" aria-hidden="true" />
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Lock">
                            <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                            <span className="glyphicon glyphicon-off" aria-hidden="true" />
                        </a>
                    </div>
                    {/* /menu footer buttons */}
                </div>
            </div>
        )
    }
}

export default LeftNav;