import React,{PureComponent} from 'react'
import {Product} from './Product'
import { ProducProvider, ProductConsumer } from '../context/ProductContext';
class Products extends PureComponent{
    constructor(props){
        super(props)
    }


    render(){
        const {isProductPage,products} =this.props;
        return products.map((p) => (
            <div className={`${isProductPage ? 'col-12 col-sm-6 col-lg-4' : ''}`}>
                <Product key={p.code} product={p} />
            </div>
        ))
    }
}

export default Products
