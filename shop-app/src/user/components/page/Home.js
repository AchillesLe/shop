import React, { Component } from "react";

import Categories from './../category/Categories';
import {withJS} from './../hoc/withJS'

import $ from 'jquery'
class Home extends Component {
  constructor(props) {
    super(props);
  }


  componentWillUnmount(){
    if(typeof $('popular-products-slides').data('owlCarousel') !== 'undefined') {
      $('popular-products-slides').data('owlCarousel').destroy();
      $('popular-products-slides').removeClass('owl-carousel');
    }
  }
  render() {
    return (
      <div>
        <Categories />
        <section className="new_arrivals_area section-padding-80 clearfix">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Sản phẩm nổi bật</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="popular-products-slides owl-carousel">
                  {this.props.renderProduct()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withJS(Home);
