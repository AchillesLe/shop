import React,{PureComponent} from "react";

import {NavItem} from './NavItem';
import logo from "./../../../assets/user/img/core-img/logo.png";
import userIcon from "./../../../assets/user/img/core-img/user.svg";
import {IconCart} from './../cart/IconCart'
import {SearchForm} from './../common/SearchForm'
const path = [
  {
    label: "Trang chủ",
    to: "/",
    activeOnlyWhenExact: true
  },
  {
    label: "Sản phẩm",
    to: "/san-pham?page=1",
    activeOnlyWhenExact: false
  },
  {
    label: "Liên hệ",
    to: "/lien-he",
    activeOnlyWhenExact: false
  }
];
class NavBar extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            isShowMenu:false
        }
    }
    toggleMenu = ()=>{
        this.setState((prevState)=>{return {isShowMenu:!prevState.isShowMenu}})
    }
    render(){
    const menuItem = path.map((link, i) => { return <NavItem key={i} to={link.to} label={link.label} activeOnlyWhenExact={link.activeOnlyWhenExact} /> })
    const {isShowMenu} = this.state;
    return (<header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
          <nav className="classy-navbar" id="essenceNav">
            <a className="nav-brand" href="/">
              <img src={logo} alt="" />
            </a>
            <div className="classy-navbar-toggler">
              <span className={`navbarToggler ${isShowMenu?'active':''}`} onClick={this.toggleMenu}>
                <span />
                <span />
                <span />
              </span>
            </div>

            <div className={`classy-menu ${isShowMenu?'menu-on':''}`}>
                <div className="classycloseIcon" onClick={this.toggleMenu}>
                <div className="cross-wrap">
                  <span className="top" />
                  <span className="bottom" />
                </div>
              </div>

              <div className="classynav">
                <ul style={{width:100+"%"}}>{menuItem}</ul>
              </div>
            </div>
          </nav>

          <div className="header-meta d-flex clearfix justify-content-end">
            <SearchForm/>
            <IconCart/>
          </div>
        </div>
    </header>);
  }
}
export default NavBar;
