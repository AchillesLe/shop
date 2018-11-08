import React, { Component } from "react";
import {urlUpload} from './../../../config'
import { callAPI } from './../../services'
import { optionsOwl as options } from "./../../../config";
import OwlCarousel from 'react-owl-carousel';
import {Product} from '../product/Product';
export const ProductContext = React.createContext();
export class ProducProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPage:0
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
  
  render(){

      return(
          <ProductContext.Provider value={{products:this.state.products,renderProduct:this.renderProduct}}>
              {this.props.children}
          </ProductContext.Provider>
      )
  }
}

export const ProductConsumer = ProductContext.Consumer
