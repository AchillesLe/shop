import React, {Component} from  'react'
import {urlUpload} from './../../../config'
import {queryStringParser,currencyParser ,callAPI} from './../../services'
import {withJS} from './../hoc/withJS'
import {AddToCartBtn} from './../cart/AddToCartBtn'
class ProductDetailPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            product:{}
        }
    }
    componentDidMount(){
        callAPI('get', `/product/getdetails/${queryStringParser(this.props.location.search)['id']}`)
        .then(data=> this.setState({product:data.data}))
    }

    render(){
        const {product} = this.state
        console.log(product)
        return <section className="single_product_details_area d-flex align-items-center mt-100">
            <div className="single_product_thumb clearfix">
              <div className="product_thumbnail_slides owl-carousel">
                <img src={`${urlUpload}/img/product-img/product-big-1.jpg`} alt="" />
                <img src={`${urlUpload}/img/product-img/product-big-2.jpg`} alt="" />
                <img src={`${urlUpload}/img/product-img/product-big-3.jpg`} alt="" />
              </div>
            </div>

            <div className="single_product_desc clearfix">
              <span>{product.categoryName}</span>

              <h2>{product.name}</h2>

              <p className="product-price">
                    Giá: {product.priceOut?currencyParser(product.priceOut):0} VNĐ
              </p>
                <p className="product-desc">
                    Kích thước: {product.width} x {product.high}
                </p>
                <p>Xuất sứ: {product.madein}</p>
              <p className="product-desc">
                {product.description}
              </p>

              <AddToCartBtn product={""} />
            </div>
          </section>;
    }
}

export default withJS(ProductDetailPage)