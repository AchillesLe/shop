import React,{Component} from 'react'

const CartContext = React.createContext()
export class CartProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartItems:[
                {id:1, name:'Lego',quantity:1,price:800}
            ],
            isToggleCart: false
        }
    }
    toggleCart = ()=>{
        this.setState({isToggleCart:!this.state.isToggleCart})
    }

    render(){
        return(
            <CartContext.Provider value={{toggleCart:this.toggleCart,isToggleCart:this.state.isToggleCart, cartItems:this.state.cartItems}}>
                {this.props.children}
            </CartContext.Provider>
        )
    }

}

export const CartConsumer = CartContext.Consumer