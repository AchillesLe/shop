import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import $ from 'jquery';

const Cookies = require('js-cookie');

class LeftNav extends Component {

    componentDidMount() {
        console.log("LeftNav componentDidMount ");
        var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
            $BODY = $('body'),
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


        $SIDEBAR_MENU.find('a').on('click', function (ev) {
            console.log('clicked - sidebar_menu');
            var $li = $(this).parent();

            if ($li.is('.active')) {
                $li.removeClass('active active-sm');
                $('ul:first', $li).slideUp(function () {
                    setContentHeight();
                });
            } else {
                // prevent closing menu if we are on child menu
                if (!$li.parent().is('.child_menu')) {
                    $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                    $SIDEBAR_MENU.find('li ul').slideUp();
                } else {
                    if ($BODY.is(".nav-sm")) {
                        $li.parent().find("li").removeClass("active active-sm");
                        $li.parent().find("li ul").slideUp();
                    }
                }
                $li.addClass('active');

                $('ul:first', $li).slideDown(function () {
                    setContentHeight();
                });
            }
        });


        // check active menu
        $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

        $SIDEBAR_MENU.find('a').filter(function () {
            return this.href === CURRENT_URL;
        }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
            setContentHeight();
        }).parent().addClass('active');
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

        return (
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{ border: 0 }}>
                        <Link to="/admin/home" className="site_title"><i className="fa fa-gift" /> <span>Admin</span></Link>
                    </div>
                    <div className="clearfix" />
                    <br />
                    {/* sidebar menu */}
                    <div id="sidebar-menu1" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section">
                            <ul className="nav side-menu">
                                <li><a ><i className="fa fa-archive" /> Product <span className="fa fa-chevron-down" /></a>
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
                                <li>
                                    <Link to="/admin/receipt">
                                        <i className="fa fa-file" /> Receipt
                                    </Link>
                                </li>
                                {
                                    isAdmin && (
                                        <li>
                                            <a>
                                                <i className="fa fa-area-chart" />Statistics <span className="fa fa-chevron-down" />
                                            </a>
                                            <ul className="nav child_menu">
                                                <li><Link to="/admin/statistic">Revenue Statistics</Link></li>
                                            </ul>
                                        </li>
                                    )
                                }

                                {isAdmin &&
                                    (<li><a><i className="fa fa-user" /> User <span className="fa fa-chevron-down" /></a>
                                        <ul className="nav child_menu">
                                            <li><Link to="/admin/user">Overview</Link></li>
                                            <li><Link to="/admin/user/create-new">Create New</Link></li>
                                        </ul>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                    {/* /sidebar menu */}
                </div>
            </div>
        )
    }
}

export default LeftNav;