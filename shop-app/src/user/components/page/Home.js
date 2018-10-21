import React, { Component } from "react";
import Products from '../product/Products';
import Categories from './../category/Categories';
class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
      <Categories/>
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
