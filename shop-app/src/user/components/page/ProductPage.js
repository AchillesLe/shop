import React, { Component } from "react";
import bgHeader from './../../../assets/user/img/bg-img/breadcumb.jpg'
import Products from './../product/Products'
import SideBar from "../nav/SideBar";
import {queryStringParser} from './../../services'
import Pagination from "react-js-pagination";
import { withJS } from './../hoc/withJS'
import history from "./../../../history";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:2,
            itemsCounterPerPage: 10,
            totalItemsCount:0,
            pageRangeDisplayed:3,
            productsPerPage:[]
        }
    }
    filterProduct = (products,page,idCate) => {
        const lastItemIndex = page * this.state.itemsCounterPerPage
        const firstItemIndex = lastItemIndex - this.state.itemsCounterPerPage
        if (!idCate) {
          return products.slice(firstItemIndex, lastItemIndex);
        } else {
          var productsByCate = products.filter(p => p.idCategory === parseInt(idCate));
          return productsByCate.slice(firstItemIndex, lastItemIndex);
        }  
    }
    handlePageChange = (pageNumber) => {
        const { history } = this.props
        console.log(this.props.match.path, this.props.location.search)
        history.push("/"); 
    }
    componentDidMount(){
        var queryString = queryStringParser(this.props.location.search)
        const activePage = queryString["page"];
        const idCate = queryString["id"];
        console.log('did')
        this.setState({
          activePage: activePage,
            totalItemsCount: idCate ? this.props.products.filter(p => p.idCategory === parseInt(idCate)).length : this.props.products.length,
            productsPerPage: this.filterProduct(this.props.products, activePage,idCate)
        });

    }

    componentWillReceiveProps(nextProps){
        var queryString = queryStringParser(this.props.location.search)
        var queryStringNext = queryStringParser(nextProps.location.search);
        const activePage = queryString["page"];
        const idCate = queryString["id"];
        const activePageNext = queryStringNext["page"];
        const idCateNext = queryStringNext["id"];
        if (idCate !== idCateNext || activePageNext !== activePage || this.props.products !== nextProps.products) {
          this.setState({
              totalItemsCount: idCateNext?nextProps.products.filter(p => p.idCategory === parseInt(idCateNext)).length:nextProps.products.length,
            productsPerPage: this.filterProduct(
              nextProps.products,
              activePage,
              idCateNext
            )
          });
        }

        
    }
  render() {
    const {activePage,itemsCounterPerPage,totalItemsCount,pageRangeDisplayed} = this.state
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
                                        <a>Đồ chơi</a>
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
                          <Products isProductPage products={this.state.productsPerPage}/>
                        </div>
                    </div>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsCounterPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={this.handlePageChange}
                    />
                </div>

            </div>
        </div>
        </section>
      </React.Fragment>
    );
  }
}
export default withJS(ProductPage);
