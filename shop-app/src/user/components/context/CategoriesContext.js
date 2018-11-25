import React,{Component} from 'react'
import {callAPI} from './../../services'

const CategoriesContext = React.createContext();
export class CategoriesProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
           listCate:[]
        }
    }
    componentDidMount(){
        callAPI('GET',`category/getall`).then(data=> this.setState({listCate:data.data}))
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