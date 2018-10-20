import React, { Component } from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

class Product extends Component {

    render() {
        return (

            <Switch>
                <Route exact path={this.props.match.path} render={ () => (
                    <div className="right_col" role="main">
                        {/* top tiles */}
                        <div className="row tile_count">
                            Product Page.
                        </div>
                    </div>
                )} />
            </Switch>
            )
        }
    }
    
export default Product;