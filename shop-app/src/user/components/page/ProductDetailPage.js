import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import { NotificationManager} from 'react-notifications';
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
    };
  }
  componentDidMount() {
    // callAPI("get",`/product/getdetails/${queryStringParser(this.props.location.search)["id"]}`)
    // .then(data => this.setState({ product: data.data}))
    // .catch(err=> {if(err){NotificationManager.error('Lỗi trong quá trình truyền dữ liệu', '');}});
    console.log(this.props.products)
    if(this.props.products){
      var product =  this.props.products.find(p=>p.idProduct === queryStringParser(this.props.location.search)["id"])
      if(product){
        this.setState({product})
      }
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.products)
      if(nextProps.products.length >0){
        var product = nextProps.products.find(p=>{ return p.idProduct == queryStringParser(nextProps.location.search)["id"]})
        if(product){
          this.setState({product})
        }
      }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.product !== this.state.product){
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      this.setState({product:this.state.product});
    }    
  }

   render() {
    const { product } = this.state;
    return product?(
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
            <p>Còn: {product.quantity} sản phẩm</p>
            {product.quantity >0?<AddToCartBtn product={product} />:""}
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
                {this.props.renderProduct(product)}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    ):<Redirect to="/san-pham"/>;
  }
}

export default withJS(ProductDetailPage);
