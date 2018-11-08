import React, { Component } from "react";
import bgHeader from './../../../assets/user/img/bg-img/breadcumb.jpg'
import Products from './../product/Products'
import SideBar from "../nav/SideBar";
import {queryStringParser} from './../../services'
import Pagination from "react-js-pagination";
import { withJS } from './../hoc/withJS'
import $ from "jquery";
import orderBy from 'lodash/orderBy'
class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:2,
            itemsCounterPerPage: 10,
            totalItemsCount:0,
            pageRangeDisplayed:3,
            productsPerPage:[],
            sortKey:'newest'
        }
    }
    filterProduct = (products,page,idCate) => {
        const lastItemIndex = page * this.state.itemsCounterPerPage
        const firstItemIndex = lastItemIndex - this.state.itemsCounterPerPage
        switch(this.state.sortKey){
            case 'newest':
                products = orderBy(products,'idProduct','desc')
                console.log(products)
                break;
            case 'decrease':
                products = orderBy(products,'priceOut','desc')
                break;
            case 'ascending':
                products = orderBy(products,'priceOut','asc')
                break;
            default: products;
        }
        
        if (!idCate) {
          return products.slice(firstItemIndex, lastItemIndex);
        } else {
          var productsByCate = products.filter(p => p.idCategory === parseInt(idCate));
          return productsByCate.slice(firstItemIndex, lastItemIndex);
        }  
    }

    handlePageChange = (pageNumber) => {
        const {history} = this.props
        var queryString = this.props.location.search.replace(`page=${this.state.activePage}`,`page=${pageNumber}`)
        history.push(`${this.props.match.path}${queryString}`); 
    }
    componentDidMount(){
        var queryString = queryStringParser(this.props.location.search)
        const activePage = queryString["page"];
        const idCate = queryString["id"];
        let _this = this;
        $(document).on("click",".list li", function(){
            var value = $(this).data('value')
            _this.setState({sortKey:value})
        })
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
        const activePageNext = queryStringNext["page"];

        const idCate = queryString["id"];
        const idCateNext = queryStringNext["id"];
        if (idCate !== idCateNext || activePageNext !== activePage || this.props.products !== nextProps.products) {
            console.log(idCateNext)
            this.setState({
                activePage: activePageNext,
                totalItemsCount: idCateNext?nextProps.products.filter(p => p.idCategory === parseInt(idCateNext)).length:nextProps.products.length,
                productsPerPage: this.filterProduct(
                    nextProps.products,
                    activePageNext,
                    idCateNext
                )
            });
        }
    }
    componentDidUpdate(prevProps, prevState){
        var queryString = queryStringParser(this.props.location.search)
        var queryStringPrev = queryStringParser(prevProps.location.search);
        const activePage = queryString["page"];
        const activePagePrev = queryStringPrev["page"];
       
        const idCate = queryString["id"];
        const idCatePrev = queryStringPrev["id"];
        if(prevState.sortKey !== this.state.sortKey){
            this.setState({               
                productsPerPage: this.filterProduct(
                    this.props.products,
                    activePage,
                    idCate
                )
            });
        }
        if(idCate !== idCatePrev || activePagePrev !== activePage || this.props.products !== prevProps.products){
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        }
    }
  render() {
    const {activePage,itemsCounterPerPage,totalItemsCount,pageRangeDisplayed,sortKey} = this.state
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
                            <div className="col-12">
                                <div className="product-topbar d-flex align-items-center justify-content-between">
                                    <div className="total-products">
                                        <p><span>{totalItemsCount}</span> Sản phẩm</p>
                                    </div>
                                    <div className="product-sorting d-flex">
                                        <p>Sắp xếp:</p>
                                    
                                        <select id="sortByselect" defaultValue={sortKey}>
                                            <option value="newest">Mới nhất</option>
                                            <option value="decrease">Giá tăng dần</option>
                                            <option value="ascending">Giá giảm dần</option>
                                        </select>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
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
