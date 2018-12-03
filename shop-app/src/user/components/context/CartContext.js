import React,{Component} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import history from './../../../history';
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
    addToCart = (item,products,updateQuantityItemInList)=>{
        var getProduct = products.find(product=> product.idProduct === item.idProduct)
        if(getProduct){
            if(getProduct.quantity>0){
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
                        idProduct: item.idProduct,code:item.code, name: item.name, price: item.priceOut,avatar:item.avatar,width:item.width,height:item.high, cateName: item.categoryName,quantity:1
                    })
                }
                this.setState({cartItems : updateCart});
                localStorage.setItem("cart", JSON.stringify(updateCart));
                updateQuantityItemInList(item,'minus')
                NotificationManager.success('Đã thêm vào giỏ hàng', '');
            }else{
                NotificationManager.error('Sản phẩm tạm thời hết hàng', '');
            }
        }else{
            NotificationManager.error('Sản phẩm không tìm thấy', '');
        }

    }
    removeItem = (e,item,updateQuantityItemInList)=>{
        e.preventDefault();
        var updateCart = this.state.cartItems.filter(p => p.idProduct !== item.idProduct)
        this.setState({cartItems: updateCart});
        updateQuantityItemInList(item,'plus')
        localStorage.setItem("cart", JSON.stringify(updateCart));
    }
    clearCart = ()=>{
        this.setState({cartItems:[]})
        localStorage.removeItem('cart');
    }
    render(){
        return(
            <CartContext.Provider value={{ state: this.state, actions: { toggleCart: this.toggleCart, addToCart: this.addToCart, removeItem: this.removeItem, clearCart:this.clearCart}}}>
                {this.props.children}
                <NotificationContainer/>
            </CartContext.Provider>
        )
    }

}

export const CartConsumer = CartContext.Consumer