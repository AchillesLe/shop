import React from 'react';
import { CartProvider, CartConsumer } from '../context/CartContext';

export const AddToCartBtn = ({product})=>{
    return (

            <CartConsumer>
                {
                    (value)=>{
                        const {addToCart}= value.actions
                        return <div className="hover-content">
                            <div className="add-to-cart-btn">
                              <button onClick={()=>addToCart(product)} className="btn essence-btn">
                                Thêm vào giỏ
                              </button>
                            </div>
                          </div>;
                    }
                }
            </CartConsumer>
    )
}
