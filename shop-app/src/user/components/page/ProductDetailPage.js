import React, {Component} from  'react'
import {urlUpload} from './../../../config'
class ProductDetailPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return(
            <section className="single_product_details_area d-flex align-items-center mt-100">

                <div className="single_product_thumb clearfix">
                    <div className="product_thumbnail_slides owl-carousel">
                        <img src={`${urlUpload}/img/product-img/product-big-1.jpg`} alt=""/>
                        <img src={`${urlUpload}/img/product-img/product-big-2.jpg`} alt=""/>
                        <img src={`${urlUpload}/img/product-img/product-big-3.jpg`} alt=""/>
                    </div>
                </div>

                <div className="single_product_desc clearfix">
                    <span>mango</span>
                    
                    <h2>One Shoulder Glitter Midi Dress</h2>
                    
                    <p className="product-price"><span className="old-price">$65.00</span> $49.00</p>
                    <p className="product-desc">Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.</p>

                    <form className="cart-form clearfix" method="post">
                        <div className="cart-fav-box d-flex align-items-center">
        
                            <button type="submit" name="addtocart" value="5" className="btn essence-btn">Add to cart</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default ProductDetailPage