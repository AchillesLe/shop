import React from 'react'
import {route} from './../../../config'
import {Link} from 'react-router-dom'
import { AddToCartBtn } from '../cart/AddToCartBtn';
import { currencyParser} from './../../services'
export const Product = ({ product}) => (
    <div className="single-product-wrapper">
        <div className="product-img">
            <img src="/img/product-img/product-1.jpg" alt="" />
            <img className="hover-img" src="/img/product-img/product-1.jpg" alt="" />
        </div>

        <div className="product-description">
            <span>{product.categoryName}</span>
            <Link to={`/${route.detail}?id=${product.idProduct}`}>
                <h6>{product.name}</h6>
            </Link>
            <p className="product-price">Giá: {currencyParser(product.priceOut)}</p>

            <AddToCartBtn product={product}/>
        </div>
    </div>
)
