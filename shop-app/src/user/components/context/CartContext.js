import React,{Component} from 'react'
import { timingSafeEqual } from 'crypto';

const CartContext = React.createContext()
export class CartProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartItems:[],
            isToggleCart: false
        }
    }
    componentDidMount = ()=>{
     
        if(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0){
            this.setState(state => ({
                cartItems: JSON.parse(localStorage.getItem('cart'))
            }));
        }
       
    }
    toggleCart = ()=>{
        this.setState({isToggleCart:!this.state.isToggleCart})
    }
    addToCart = (item)=>{

        var found=false;
        var updateCart = this.state.cartItems.map(cartItem =>{
            if(cartItem.name == item.name){
                found = true;
                cartItem.quantity++;
            }
            return cartItem;
        })
        if(!found){
            updateCart.push({
                id: item.idProduct,code:item.code, name: item.name, price: item.priceOut,avatar:item.avatar,width:item.width,height:item.high, cateName: item.categoryName,quantity:1
            })
        }

        this.setState({cartItems : updateCart});
        localStorage.setItem("cart", JSON.stringify(updateCart));
        
    }
    removeItem = (id)=>{
        var updateCart = this.state.cartItems.filter(item => item.id !== id)
        this.setState({cartItems: updateCart});
        localStorage.setItem("cart", JSON.stringify(updateCart));
    }
    render(){
        return(
            <CartContext.Provider value={{ state: this.state, actions: { toggleCart: this.toggleCart, addToCart: this.addToCart, removeItem: this.removeItem}}}>
                {this.props.children}
            </CartContext.Provider>
        )
    }

}

export const CartConsumer = CartContext.Consumer