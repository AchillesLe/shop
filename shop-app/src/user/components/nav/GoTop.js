import React,{PureComponent} from 'react'
import $ from 'jquery'
import throttle from 'lodash/throttle';
export class GoTop extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            isDown:false
        }
    }
    goTop = (e) => {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    }
    updateScrollTop =()=>{
        if ($(document).scrollTop() > $(window).height() / 3) {
            this.setState((prvState) => {
                return {
                    isDown: true
                }
            })
        }else{
            this.setState((prvState) => {
                return {
                    isDown: false
                }
            })
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',throttle(this.updateScrollTop,100))
    }

    render(){
        return this.state.isDown?(<a id="scrollUp" onClick={this.goTop} href="#top" style={{position: 'fixed', zIndex: 2147483647, display: 'block'}}><i className="fa fa-angle-up" aria-hidden="true"></i></a>):''

    }
}