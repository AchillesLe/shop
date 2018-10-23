import React,{Component} from 'react'

const CategoriesContext = React.createContext();
export class CategoriesProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
           listCate:[
                {id:1,name:'Trí tuệ',image:''},
                {id:2,name:'Nhập vai',image:''},
                {id:3,name:'Bán hàng',image:''},
                {id:4,name:'Xếp hình',image:''},
                {id:5,name:'Mô hình',image:''},
            ]
        }
    }

    render(){
        return(
            <CategoriesContext.Provider value={{listCate:this.state.listCate}}>
              {this.props.children}
            </CategoriesContext.Provider>
        )
    }
}

export const CategoriesConsumer = CategoriesContext.Consumer