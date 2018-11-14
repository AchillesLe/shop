import React, { Component } from "react";
import {route} from './../../../config'
import { callAPI } from './../../services'
import { optionsOwl as options } from "./../../../config";
import OwlCarousel from 'react-owl-carousel';
import {Product} from '../product/Product';
import history from './../../../history';
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
  renderProduct = () => {
    if(this.state.products){
      if(this.state.products.length > 0){
          var res =this.state.products.map(p => (
              <Product key={p.idProduct} product={p} />
            ));
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

    callAPI("GET", `product/get/page`).then(data =>
      this.setState({ products: data.data.list, totalPage:data.data.total })
    ).catch(ex=>{console.log(ex)});
  }
  onChangeKeyword = (keyword)=>{

    this.setState({keyword})
  }
  onSubmitKeyword = (e)=>{
    e.preventDefault();
    var keyword = this.state.keyword.replace(/ /g, '-')
    history.push(`${route.product}?keyword=${keyword}&page=1`); 
  }
  render(){
      return(
          <ProductContext.Provider value={{keyword:this.state.keyword,products:this.state.products,renderProduct:this.renderProduct,onChangeKeyword:this.onChangeKeyword,onSubmitKeyword:this.onSubmitKeyword}}>
              {this.props.children}
          </ProductContext.Provider>
      )
  }
}

export const ProductConsumer = ProductContext.Consumer
