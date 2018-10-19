import React, { Component } from "react";
import bgHeader from './../../../assets/user/img/bg-img/breadcumb.jpg'
import Products from './../product/Products'
import SideBar from "../nav/SideBar";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    console.log(this.props.match.params)
    return (
      <React.Fragment>
         
      <section className="shop_grid_area section-padding-80">
       <div className="breadcumb_area bg-img" style={{backgroundImage: `url(${bgHeader})`}}>
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12">
                        <div className="page-title text-center">
                            <h2>Sản phẩm</h2>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        <div className="container section-padding-80">
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                    <div className="shop_sidebar_area">
                        <div className="widget catagory mb-50">
                            <h6 className="widget-title mb-30">Loại</h6>
                            <div className="catagories-menu">
                                <ul id="menu-content2" className="menu-content collapse show">
                                    <li>
                                        <a href="#">Đồ chơi</a>
                                        <SideBar/>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="col-12 col-md-8 col-lg-9">
                    <div className="shop_grid_product_area">
                        

                        <div className="row">
                          <Products isProductPage/>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </section>
      </React.Fragment>
    );
  }
}
export default ProductPage;
