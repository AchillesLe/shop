import React, { Component } from "react";
import Products from '../product/Products';
import {Product} from '../product/Product';
import {ProductConsumer,ProducProvider} from './../context/ProductContext'
import Categories from './../category/Categories';
import {withJS} from './../withJS'
import $ from 'jquery'
    // return (
    //   <React.Fragment>
    //   <Product/> 
    //   <Product/> 
    //   <Product/>
    //   </React.Fragment>
    // )
    
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        products : [
          { id: 1, name: "A", price: 500, description: "Sản phẩm A",image:`/img/product-img/product-1.jpg` },
          { id: 2, name: "B", price: 500, description: "Sản phẩm B", image:`/img/product-img/product-2.jpg`},
          { id: 3, name: "C", price: 500, description: "Sản phẩm C",image:`/img/product-img/product-3.jpg`},
          { id: 4, name: "D", price: 500, description: "Sản phẩm D",image:`/img/product-img/product-4.jpg`}
        ],
    }
  }
  componentDidMount(){
    this.getProduct();
  }
  getProduct =()=>{
    return(
      <ProducProvider>
        <ProductConsumer>
        {
          ({products})=>{
            this.setState({products:products})
          }
        }
        </ProductConsumer>
      </ProducProvider>
    )
  }
  renderProduct = (pros) => {
    return pros.map((p)=> (<Product key={p.id.toString} product={p}/>))
  }
  render() {
    return (
      <div>
      <Categories/>
      <section className="new_arrivals_area section-padding-80 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                <h2>Sản phẩm nổi bật</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">  
             <div className="popular-products-slides owl-carousel"> 
              {this.renderProduct(this.state.products)}
             </div>             

            </div>
          </div>
        </div>
      </section>
      </div>
         
    );
  }
}
export default withJS(Home);
