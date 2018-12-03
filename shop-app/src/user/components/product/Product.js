import React from 'react'
import {route} from './../../../config'
import {Link} from 'react-router-dom'
import { AddToCartBtn } from '../cart/AddToCartBtn';
import { currencyParser} from './../../services'
import defaultImage from "./../../../assets/images/app/default-placeholder.png";

export const Product = ({ product}) => (
    
    <div className="single-product-wrapper">
        <div className="product-img">
            <img src={product.avatar||defaultImage} alt="" />
            <img className="hover-img" src={product.images} alt="" />
        </div>
        <div className="product-description">
            <span>{product.categoryName}</span>
            <Link to={`/${route.detail}?id=${product.idProduct}`}>
                <h6>{product.name}</h6>
            </Link>
            <p className="product-price">Giá: {currencyParser(product.priceOut)}</p>
            {product.quantity >0 ?<AddToCartBtn product={product}/>:''}
        </div>
    </div>
)
