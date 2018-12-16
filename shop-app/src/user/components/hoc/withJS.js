import React from 'react'
import $ from 'jquery'
import {ProductConsumer} from './../context/ProductContext'
const vendorJS = [

    './js/jquery/jquery-2.2.4.min.js',
    './js/popper.min.js',
    './js/bootstrap.min.js',
    './js/plugins.js',
    './js/classy-nav.min.js',
    './js/active.js'
]
export const withJS = (Component)=>{
    return class appendJS extends React.Component {

        removeScript = () =>{
            return vendorJS.map((script) => {
                var currentScript = $('body').find('script[src="'+script+'"]');
                if (currentScript) {
                    currentScript.remove();
                }
            })
        }
        renderScript = () => {
            return vendorJS.map((script) => {
                return $('body').append('<script type="text/javascript" src="' + script + '"></scrip>')
            })
        }
        componentDidMount(){
            $(document).ready(() => {
                this.removeScript();
                this.renderScript();
            })
          
        }
        render() {
            return (
              
                    <ProductConsumer>
                        {({products,renderProduct}) => <Component {...this.props} renderProduct={renderProduct} products={products}/>}
                    </ProductConsumer>
      
            );
        }
    }
}
