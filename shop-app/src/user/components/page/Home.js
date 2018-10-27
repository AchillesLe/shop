import React, { Component } from "react";

import {Product} from '../product/Product';

import Categories from './../category/Categories';
import {withJS} from './../hoc/withJS'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.products !== nextProps.products){
      localStorage.setItem('hot-product', JSON.stringify(nextProps.products))
      this.setState({products: [...nextProps.products]})
    }
  }
  renderProduct = () => {
    return JSON.parse(localStorage.getItem("hot-product")).map(p => (
      <Product key={p.id} product={p} />
    ));
  };
  render() {
    console.log(this.state.products);
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
                  {this.renderProduct()}
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
