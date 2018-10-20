import React,{PureComponent} from 'react'
import {Product} from './Product'
import { ProducProvider, ProductConsumer } from '../context/ProductContext';
class Products extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        const {isProductPage} =this.props;
         return(
            <ProducProvider>
                <ProductConsumer>
                    {
                        ({products})=>{
                            return products.map((p)=> isProductPage?
                                (
                                    <div className="col-12 col-sm-6 col-lg-4">
                                    <Product key={p.id} product={p}/>
                                    </div>
                                ):( <Product key={p.id} product={p}/>)
                            )
                        }
                    }
                </ProductConsumer>
            </ProducProvider>
         )
    }
}

export default Products
