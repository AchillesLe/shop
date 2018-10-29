import React from 'react'

import {CartConsumer} from './../context/CartContext'
import cartIcon from "./../../../assets/user/img/core-img/bag.svg"
export const IconCart = ({isAtRightCart})=>{
    return(
        <CartConsumer>
            {
                (value) =>{
                    const {cartItems} = value.state
                    const { toggleCart} = value.actions
                    return(
                        <div className={`${isAtRightCart?'cart-button':'cart-area'}`}>
                            <a href="javascript:;" onClick={toggleCart} id="essenceCartBtn">
                                <img src={cartIcon} alt="" /> <span>{cartItems.length}</span>
                            </a>
                        </div>
                    )
                }
            }
        </CartConsumer>
    )
}