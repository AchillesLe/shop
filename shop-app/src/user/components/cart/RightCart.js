import React from 'react'
import {Link} from 'react-router-dom'
import { IconCart } from './IconCart';
import { CartConsumer } from '../context/CartContext';
import {route,urlUpload} from './../../../config'
const CartItem = ({cartItem}) =>(
    <div className="single-cart-item">
        <Link to={`/${route.detail}?id=${cartItem.id}/`} className="product-image">
            <img src={`${urlUpload}/img/product-img/product-1.jpg`} className="cart-thumb" alt=""/>
            <div className="cart-item-desc">
            <span className="product-remove"><i className="fa fa-close" aria-hidden="true"></i></span>
                <span className="badge">Mango</span>
                <h6>Button Through Strap Mini Dress</h6>
                <p className="size">1</p>
                <p className="color">Color: Red</p>
                <p className="price">$45.00</p>
            </div>
        </Link>
    </div>
)
const getTotal = (cartItems)=>{
    return cartItems.reduce((total,item)=>{
        return total+ (item.quantity* item.price)
    },0)
}
export const RightCart = ()=>{
    return (
        <React.Fragment>
                <CartConsumer>
                    {
                        (value)=>{
                            const {cartItems,isToggleCart} = value;
                            return(
                                <React.Fragment>
                                <div className={`cart-bg-overlay ${isToggleCart?'cart-bg-overlay-on':''}`}></div>
                                <div className={`right-side-cart-area ${isToggleCart?'cart-on':''}`}>
                                    <IconCart isAtRightCart/>
                                    <div className="cart-content d-flex">
                                        <div className="cart-list">
                                            {cartItems.map((item)=>{return <CartItem cartItem={item} key={item.id} />})}
                                        </div>
                                        <div className="cart-amount-summary">
                                            <h2>Summary</h2>
                                            <ul className="summary-table">
                                                <li><span>total:</span> <span>{getTotal(cartItems)}</span></li>
                                            </ul>
                                            <div className="checkout-btn mt-100">
                                                <a href="checkout.html" className="btn essence-btn">Đặt hàng</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </React.Fragment>
                            )
                        }
                    }
                </CartConsumer>
        </React.Fragment>
    )
}