import React from 'react'

const Category =({category})=>(
    <div className="col-12 col-sm-6 col-md-4">
        <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{backgroundImage: `url(${category.image})`}}>
            <div className="catagory-content">
                <a href="#">{category.name}</a>
            </div>
        </div>
    </div>
)

export const Categories = ({listCate})=>{
    return(
        <div className="top_catagory_area section-padding-80 clearfix">
            <div className="container">
                <div className="row justify-content-center">
                    {listCate.map((cate,i) => { return <Category key={i} category = {cate} />})}
                </div>
            </div>
        </div>
    )

}