import React, { Component } from 'react';
import img from '../../../../assets/images/img.jpg';

import { Link } from 'react-router-dom';

class LeftNav extends Component {
    constructor() {
        super();
        this.state = {
            active: false
        }
    }

    toggleMenu() {
        this.setState({
            active: !this.state.active
        })
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
                                <li className={this.state.active ? "active" : ""} onClick={this.toggleMenu.bind(this)}><a><i className="fa fa-home" /> Product <span className="fa fa-chevron-down" /></a>
                                    <ul className="nav child_menu" style={{ display: this.state.active ? 'block' : 'none' }}>
                                        <li><Link to="/admin/product">View Details</Link></li>
                                        <li><a href="index2.html">Statistics</a></li>
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