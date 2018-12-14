import React, { Component } from "react";
import {route} from './../../../config'
import { callAPI } from './../../services'
import { optionsOwl as options } from "./../../../config";
import OwlCarousel from 'react-owl-carousel';
import {Product} from '../product/Product';
import history from './../../../history';
import orderBy from 'lodash/orderBy'
import { NotificationManager} from 'react-notifications';

export const ProductContext = React.createContext();
export class ProducProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPage:0,
      keyword:''
    };
    
  }
  renderProduct = (withoutProd) => {
    if(this.state.products){
      if(this.state.products.length > 0){
          var products= [];
          if(!withoutProd){
            products = orderBy(this.state.products,'idProduct','desc')
          }else{
            products = this.state.products.filter(p=>p.idProduct !== withoutProd.idProduct && withoutProd.idCategory === p.idCategory)
          }
          var res =products.map((p,i) => {
            return i<10 ? (
              <Product key={p.idProduct} product={p} />
            ):''});
          return <OwlCarousel
                  className="owl-theme"
                  refreshClass="owl-refresh"
                  {...options} 
                  >
                  {res}
              </OwlCarousel>
        }
    }
  };
  componentDidMount() {
    callAPI("GET", `product/get/page`).then(data =>{
      if(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length >0 ){
        var cart = JSON.parse(localStorage.getItem('cart'));
        data.data.list.forEach(pro => {
          var itemInCart = cart.find(item => {return pro.idProduct === item.idProduct})
          if(itemInCart){
            pro.quantity -= itemInCart.quantity
          }
        });
      }
      this.setState({ products: data.data.list, totalPage:data.data.total })

    }).catch(err=> {if(err){NotificationManager.error('Lỗi trong quá trình truyền dữ liệu', '');}});
  }
  onChangeKeyword = (keyword)=>{
    this.setState({keyword})
  }
  onSubmitKeyword = (e)=>{
    e.preventDefault();
    var keyword = this.state.keyword.replace(/ /g, '-')
    history.push(`${route.product}?keyword=${keyword}&page=1`); 
  }
  updateQuantityItemInList = (item,typeChange)=>{
    var findItem = this.state.products.find(p=> p.idProduct === item.idProduct)
    if(findItem){
      if(typeChange==='minus'){
        findItem.quantity -= 1;
      }else if(typeChange === 'plus'){
        findItem.quantity += item.quantity;
      }
      this.setState((prevState)=> { return {products:[...prevState.products]}})
    }
  }
  render(){
      return(
          <ProductContext.Provider value={{keyword:this.state.keyword,products:this.state.products,renderProduct:this.renderProduct,onChangeKeyword:this.onChangeKeyword,onSubmitKeyword:this.onSubmitKeyword,updateQuantityItemInList:this.updateQuantityItemInList}}>
              {this.props.children}
          </ProductContext.Provider>
      )
  }
}

export const ProductConsumer = ProductContext.Consumer
