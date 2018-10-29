import React, { Component } from "react";
import {urlUpload} from './../../../config'
import { callAPI } from './../../services'
export const ProductContext = React.createContext();
export class ProducProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPage:0
    };
  }

  componentDidMount() {

    callAPI("GET", `product/get/page`).then(data =>
      this.setState({ products: data.data.list, totalPage:data.data.total })
    );
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
