import React from 'react'
import { CartConsumer } from '../context/CartContext';

export const withCartContext = (Component)=>{
    return (props)=>{
        return (
            <CartConsumer>
                {
                    (value) => {
                        const { cartItems } = value.state
                        const { clearCart} = value.actions
                        return <Component {...props} cartItems={cartItems} clearCart={clearCart} />
                    }
                }
            </CartConsumer>
        )
    }
}
