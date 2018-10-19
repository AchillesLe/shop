import React,{PureComponent} from 'react'
import { CategoriesProvider, CategoriesConsumer } from '../context/CategoriesContext';
const Category =({category})=>(
    <div className="col-12 col-sm-6 col-md-4">
        <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{backgroundImage: `url(${category.image})`}}>
            <div className="catagory-content">
                <a href="#">{category.name}</a>
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
                                    return listCate.map((cate,i) => { return i<3?(<Category key={i} category = {cate} />):''})
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
