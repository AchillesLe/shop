import React from 'react'
import {route} from './../../../config'
import {Link} from 'react-router-dom'
import { AddToCartBtn } from '../cart/AddToCartBtn';
export const Product = ({ product, addToCart }) => (
    //  product = { id: 1, name: "A", price: 500, description: "Sản phẩm A",image:`/img/product-img/product-1.jpg` },
    
    <div className="single-product-wrapper">
        <div className="product-img">
            <img src={product.image} alt="" />
            <img className="hover-img" src={product.image} alt="" />
        </div>

        <div className="product-description">
            <span>topshop</span>
            <Link to={`/${route.detail}?id=${product.id}/`}>
                <h6>Knot Front Mini Dress</h6>
            </Link>
            <p className="product-price">$80.00</p>

            <AddToCartBtn product={product}/>
        </div>
    </div>
)
