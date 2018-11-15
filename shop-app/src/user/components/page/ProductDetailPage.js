import React, { Component } from "react";

import { urlUpload} from "./../../../config";
import { queryStringParser, currencyParser, callAPI } from "./../../services";
import { withJS } from "./../hoc/withJS";
import { AddToCartBtn } from "./../cart/AddToCartBtn";
import $ from 'jquery'
class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      currentProps:null
    };
  }
  componentWillMount(){
    this.setState({currentProps:{...this.props}});
  }
  componentDidMount() {
    callAPI("get",`/product/getdetails/${queryStringParser(this.props.location.search)["id"]}`).then(data => this.setState({ product: data.data}));
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.location.search !== this.props.location.search){
      callAPI("get",`/product/getdetails/${queryStringParser(nextProps.location.search)["id"]}`).then(data => this.setState({ product: data.data }));
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.product !== this.state.product){
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      this.setState({currentProps:{...this.props}});
    }    
  }

  render() {
    const { product,currentProps } = this.state;
    console.log(this.nextPr)
    return (
      <React.Fragment>
        <section className="single_product_details_area d-flex align-items-center mt-100">
          <div className="single_product_thumb clearfix">
            <div className="product_thumbnail_slides owl-carousel">
              <img
                src={`${urlUpload}/img/product-img/product-big-1.jpg`}
                alt=""
              />
              <img
                src={`${urlUpload}/img/product-img/product-big-2.jpg`}
                alt=""
              />
              <img
                src={`${urlUpload}/img/product-img/product-big-3.jpg`}
                alt=""
              />
            </div>
          </div>

          <div className="single_product_desc clearfix">
            <span>{product.categoryName}</span>

            <h2>{product.name}</h2>

            <p className="product-price">
              Giá: {product.priceOut ? currencyParser(product.priceOut) : 0} VNĐ
            </p>
            <p className="product-desc">
              Kích thước: {product.width} x {product.high}
            </p>
            <p>Xuất sứ: {product.madein}</p>
            <p className="product-desc">{product.description}</p>

            <AddToCartBtn product={product} />
          </div>
        </section>
        <section className="new_arrivals_area section-padding-80 clearfix">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Sản phẩm liên quan</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                {currentProps.renderProduct(product)}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withJS(ProductDetailPage);
