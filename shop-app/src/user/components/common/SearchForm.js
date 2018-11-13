import React from 'react'
import {ProductConsumer,ProducProvider} from './../context/ProductContext'
export const SearchForm = ()=>{
    return(
        <ProducProvider>
            <ProductConsumer>
            {
                ({onSubmitKeyword,onChangeKeyword,keyword}) =>{
                    return(
                        <div className="search-area">
                        <form onSubmit={onSubmitKeyword}>
                            <input type="search" name="search" value={keyword} onChange={e=>onChangeKeyword(e.target.value)} id="headerSearch" placeholder="Tìm đồ chơi" />
                            <button type="submit">
                            <i className="fa fa-search" aria-hidden="true" />
                            </button>
                        </form>
                        </div>
                    )
                }
            }
            </ProductConsumer>
        </ProducProvider>
    )
}