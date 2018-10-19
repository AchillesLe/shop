import React,{PureComponent} from 'react'
import {Product} from './Product'
import { ProducProvider, ProductConsumer } from '../context/ProductContext';
class Products extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
         return(
            <ProducProvider>
                <ProductConsumer>
                    {
                        ({products})=>{
                            return products.map((p,i)=>
                                (
                                    <Product key={i} product={p}/>
                                )
                            )
                        }
                    }
                </ProductConsumer>
            </ProducProvider>
         )
    }
}

export default Products
