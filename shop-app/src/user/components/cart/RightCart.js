import React from 'react'
import {Link} from 'react-router-dom'
import { IconCart } from './IconCart';
import { CartConsumer } from '../context/CartContext';
import {route,urlUpload} from './../../../config'
import {currencyParser} from './../../services'
const CartItem = ({ cartItem, removeItem}) =>(
    <div className="single-cart-item">
        <Link to={`/${route.detail}?id=${cartItem.id}/`} className="product-image">
            <img src={`${urlUpload}/img/product-img/product-1.jpg`} className="cart-thumb" alt=""/>
            <div className="cart-item-desc">
                <span className="product-remove" onClick={() => removeItem(cartItem.id)}><i className="fa fa-close" aria-hidden="true"></i></span>
                <span className="badge">{cartItem.cateName}</span>
                <h6>{cartItem.name}</h6>
                <p className="size">Số lượng: {cartItem.quantity}</p>
                <p className="price">Giá: {currencyParser(cartItem.price)} VNĐ</p>
            </div>
        </Link>
    </div>
)
export const getTotal = (cartItems)=>{
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
                            const {cartItems,isToggleCart} = value.state;
                            const { removeItem,toggleCart } = value.actions;
                            return(
                                <React.Fragment>
                                <div className={`cart-bg-overlay ${isToggleCart?'cart-bg-overlay-on':''}`}></div>
                                <div className={`right-side-cart-area ${isToggleCart?'cart-on':''}`}>
                                    <IconCart isAtRightCart/>
                                    <div className="cart-content d-flex">
                                        <div className="cart-list">
                                            {cartItems.map((item)=>{return <CartItem removeItem={removeItem} cartItem={item} key={item.code} />})}
                                        </div>
                                        <div className="cart-amount-summary">
                                            <h2>Tổng giá trị đã mua</h2>
                                            <ul className="summary-table">
                                                <li><span>Tổng cộng:</span> <span>{currencyParser(getTotal(cartItems))}</span></li>
                                            </ul>
                                            <div className="checkout-btn mt-100">
                                                    
                                                    {cartItems.length > 0 && <Link to={`/${route.checkout}`} onClick={toggleCart} className="btn essence-btn">Đặt hàng</Link>}
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