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
    const products = [
      { id: 1, name: "A", price: 500, description: "Sản phẩm A",image:`${urlUpload}/img/product-img/product-1.jpg` },
      { id: 2, name: "B", price: 500, description: "Sản phẩm B", image:`${urlUpload}/img/product-img/product-2.jpg`},
      { id: 3, name: "C", price: 500, description: "Sản phẩm C",image:`${urlUpload}/img/product-img/product-3.jpg`},
      { id: 4, name: "D", price: 500, description: "Sản phẩm D",image:`${urlUpload}/img/product-img/product-4.jpg`}
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
