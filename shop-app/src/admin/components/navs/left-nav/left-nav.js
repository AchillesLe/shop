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
                        <Link to="/admin/home" className="site_title"><i className="fa fa-gift" /> <span>Admin</span></Link>
                    </div>
                    <div className="clearfix" />
                    <br />
                    {/* sidebar menu */}
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section">
                            <ul className="nav side-menu">
                                <li><a><i className="fa fa-archive" /> Product <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu">
                                        <li><Link to="/admin/product">Overview</Link></li>
                                        <li><Link to="/admin/product/create-new">Create New</Link></li>
                                    </ul>
                                </li>
                                <li><a><i className="fa fa-list-alt" /> Category <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu">
                                        <li><Link to="/admin/category">Overview</Link></li>
                                        <li><Link to="/admin/category/create-new">Create New</Link></li>
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