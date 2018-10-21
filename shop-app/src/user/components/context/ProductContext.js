import React, { Component } from "react";
import {urlUpload} from './../../../config'
const ProductContext = React.createContext();
export class ProducProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    console.log('con')
    const products = [
      { id: 1, name: "A", price: 500, description: "Sản phẩm A",image:`${urlUpload}/img/product-img/product-1.jpg`,cateID:1 },
      { id: 2, name: "B", price: 500, description: "Sản phẩm B", image:`${urlUpload}/img/product-img/product-2.jpg`,cateID:2},
      { id: 3, name: "C", price: 500, description: "Sản phẩm C",image:`${urlUpload}/img/product-img/product-3.jpg`,cateID:3},
      { id: 4, name: "D", price: 500, description: "Sản phẩm D",image:`${urlUpload}/img/product-img/product-4.jpg`,cateID:4}
    ];
    this.setState({ products: products });
  }
  render(){
      return(
          <ProductContext.Provider value={{products:this.state.products}}>
              {this.props.children}
          </ProductContext.Provider>
      )
  }
}

export const ProductConsumer = ProductContext.Consumer
