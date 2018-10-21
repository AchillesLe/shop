import React,{PureComponent} from 'react'
import { CategoriesProvider, CategoriesConsumer } from '../context/CategoriesContext';
import {Link} from 'react-router-dom';
import {route} from './../../../config'
const Category =({category})=>(
    <div className="col-12 col-sm-6 col-md-4">
        <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{backgroundImage: `url(${category.image})`}}>
            <div className="catagory-content">
                <Link to={`${route.product}?id=${category.id}`}>{category.name}</Link>
            </div>
        </div>
    </div>
)
class Categories extends PureComponent{
    render(){
        return(
            <CategoriesProvider>
               
                    <div className="top_catagory_area section-padding-80 clearfix">
                        <div className="container">
                            <div className="row justify-content-center">
                            <CategoriesConsumer>
                            {
                                ({listCate})=>{
                                    return listCate.map((cate,i) => { return i<3?(<Category key={cate.id} category = {cate} />):''})
                                }
                            }
                            </CategoriesConsumer>
                            </div>
                        </div>
                    </div>
                
            </CategoriesProvider>
        )
    }
}

export default Categories
