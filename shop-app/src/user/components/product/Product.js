import React from 'react'
import {route} from './../../../config'
export const Product = ({ product, addToCart }) => (
    <div className="single-product-wrapper">
        <div className="product-img">
            <img src={product.image} alt="" />
            <img className="hover-img" src={product.image} alt="" />
        </div>

        <div className="product-description">
            <span>topshop</span>
            <a href={`/${route.detail}?id=${product.id}/`}>
                <h6>Knot Front Mini Dress</h6>
            </a>
            <p className="product-price">$80.00</p>

            <div className="hover-content">
                <div className="add-to-cart-btn">
                    <button onClick={addToCart} className="btn essence-btn">
                        Thêm vào giỏ
                 </button>
                </div>
            </div>
        </div>
    </div>
)
