import React,{PureComponent} from 'react'
import {Product} from './Product'
import { ProducProvider, ProductConsumer } from '../context/ProductContext';
class Products extends PureComponent{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log('p')
    }
    filterProduct = (products,cateID)=>{
        if(!cateID){
            return products
        }
        var result = products.filter(p => p.cateID === parseInt(cateID));
        return result
    }
    render(){
        const {isProductPage,cateID} =this.props;
         return(
            <ProducProvider>
                <ProductConsumer>
                    {
                        ({products})=>{
                            var result = this.filterProduct(products,cateID)
                           
                            return result.map((p) =>(
                                <div className={`${isProductPage?'col-12 col-sm-6 col-lg-4':''}`}>
                                    <Product key={p.id} product={p}/>
                                </div>
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
