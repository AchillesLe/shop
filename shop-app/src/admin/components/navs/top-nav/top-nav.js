import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import img from '../../../../assets/images/img.jpg';
import AdminContext from '../../admin.context';
import TopNavService from './top-nav.service';
import $ from 'jquery';
const Cookies = require('js-cookie');

class TopNav extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                isActive: false
            }
        }

        this._topNavService = new TopNavService();
    }

    componentDidMount(){
        var $BODY = $('body'),
        $MENU_TOGGLE = $('#menu_toggle1'),
        $SIDEBAR_MENU = $('#sidebar-menu1'),
        $SIDEBAR_FOOTER = $('.sidebar-footer'),
        $LEFT_COL = $('.left_col'),
        $RIGHT_COL = $('.right_col'),
        $NAV_MENU = $('.nav_menu'),
        $FOOTER = $('footer');

        var setContentHeight = function () {
            // reset height
            $RIGHT_COL.css('min-height', $(window).height());
        
            var bodyHeight = $BODY.outerHeight(),
                footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
                leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
        
            // normalize content
            contentHeight -= $NAV_MENU.height() + footerHeight;
        
            $RIGHT_COL.css('min-height', contentHeight);
        };
        
        // toggle small or large menu 
        $MENU_TOGGLE.on('click', function () {
            console.log('clicked - menu toggle');

            if ($BODY.hasClass('nav-md')) {
                $SIDEBAR_MENU.find('li.active ul').hide();
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            } else {
                $SIDEBAR_MENU.find('li.active-sm ul').show();
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            }

            $BODY.toggleClass('nav-md nav-sm');

            setContentHeight();

            //$('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
        });
    }

    toggleUser() {
        this.setState({
            user: {
                isActive: !this.state.active
            }
        })
    }

    logOut(token,callback, e){
        e.preventDefault();
        console.log(token);
        this._topNavService.logOut(token).then(res => {
            console.log(res.data);
            if(res.status === 200){
                callback({});
                Cookies.remove('token');
                Cookies.remove('user');
                this.props.history.push('/admin');
            }
        });
    }

    render() {
        return (
            <AdminContext.Consumer>
                {({ user , setUser}) => !Cookies.get('token') ? <Redirect to="/admin" /> : (
                    <div className="top_nav">
                        <div className="nav_menu">
                            <nav>
                                <div className="nav toggle">
                                    <a id="menu_toggle1"><i className="fa fa-bars" /></a>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={this.state.user.isActive ? "open" : ""}>
                                        <a style={{cursor: "pointer"}} onClick={this.toggleUser.bind(this)} className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            <img src={img} alt="Profile" /><span>{Object.keys(user).length === 0 ? "" : user.data.User.fullname}   </span>
                                            <span className=" fa fa-angle-down" />
                                        </a>
                                        <ul className="dropdown-menu dropdown-usermenu pull-right">
                                            <li><Link to={"/admin/profile/" + user.data.User.iduser}> Profile</Link></li>
                                            <li><a href="" onClick={this.logOut.bind(this, Object.keys(user).length === 0 ? "" : user.data.token, setUser.bind(this))}><i className="fa fa-sign-out pull-right" /> Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </AdminContext.Consumer>

        )
    }
}

export default TopNav;