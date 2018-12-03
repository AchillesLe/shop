import React from 'react';
import { CartConsumer } from '../context/CartContext';
import { ProductConsumer } from '../context/ProductContext';

export const AddToCartBtn = ({product})=>{
    return (
            <ProductConsumer>
                {
                    ({products,updateQuantityItemInList})=>{
                        return(
                            <CartConsumer>
                            {
                                (value)=>{
                                    const {addToCart}= value.actions
                                    return <div className="hover-content">
                                        <div className="add-to-cart-btn">
                                        <button onClick={()=>addToCart(product,products,updateQuantityItemInList)} className="btn essence-btn">
                                            Thêm vào giỏ
                                        </button>
                                        </div>
                                    </div>
                                }
                            }
                            </CartConsumer>
                        )
                    }
                }
            </ProductConsumer>
        
    )
}
