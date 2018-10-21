import React,{PureComponent} from 'react'
import {Link} from 'react-router-dom'
import { CategoriesConsumer,CategoriesProvider } from '../context/CategoriesContext';

import {route} from './../../../config'
const SideBarItem = ({cate})=>(
    <li><Link to={`${route.product}?id=${cate.id}`}>{cate.name}</Link></li>
)
class SideBar extends PureComponent{
    render(){
        return(
            <ul className="sub-menu collapse show" id="clothing">
                <li><Link to={`/${route.product}`}>Tất cả</Link></li>            
             <CategoriesProvider>
                <CategoriesConsumer>
                    {
                        ({listCate})=>{
                            return listCate.map((cate,i)=>{return <SideBarItem key={i} cate={cate}/>})
                        }
                    }
                </CategoriesConsumer>
             </CategoriesProvider>
             </ul>
        )
    }
}
export default SideBar