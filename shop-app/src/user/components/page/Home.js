import React, { Component } from "react";
import Products from '../product/Products';
import {Categories} from './../category/Categories';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCate:[
        {name:'Trí tuệ',image:''},
        {name:'Nhập vai',image:''},
        {name:'Bán hàng',image:''}
      ]
    }
  }

  render() {
    console.log(this.state.listCate)
    return (
      <div>
      <Categories listCate={this.state.listCate}/>
      <section className="new_arrivals_area section-padding-80 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                <h2>Popular Products</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="popular-products-slides owl-carousel">
                <Products/>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
         
    );
  }
}
export default Home;
