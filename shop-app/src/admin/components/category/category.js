import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Route,
    Switch
} from 'react-router-dom';

//CSS
import './category.css';

import $ from 'jquery';
import { NotificationManager } from 'react-notifications';

import categoryService from './category.service';
import EditCategory from './editCategory';
import AddCategory from './addCategory';

const Cookies = require('js-cookie');

class Category extends Component {

    constructor() {
        super();
        this.state = {
            category: [],
        }
        this._categoryService = new categoryService();
    }

    componentDidMount() {
        console.log('Category componentDidMount');
        this.getCategories();
        console.log(this.state.category);
    }

    // componentDidUpdate() {
    //     console.log('Category componentDidUpdate');
    //     if ($('.dataTables_length').length > 0) return
    //     this.reloadLibs();

    //     setTimeout(() => {
    //         console.log($('.dataTables_length').find('label'));
    //     }, 2000);
    // }

    reloadLibs() {
        console.log('Category reloadLibs');

        $(document).ready(() => {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '/vendors/js/libs.js';

            var currentScript = $('body').find('script[src="/vendors/js/libs.js"]');
            if (currentScript) {
                currentScript.remove();
            }

            body.appendChild(script);

            $(window).on('load', () => {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/vendors/css/libs.css';

                var currentLink = $('head link[href="/vendors/css/libs.css"]');
                if (currentLink) {
                    currentLink.remove();
                }

                head.appendChild(link);
            });

            //remove conflict css
            $('style[type="text/css"]').each(function () {
                if ($(this).text().includes('Bootstrap v4.1.0')) {
                    console.log('_______________________');
                    console.log('remove conflict css');
                    console.log(this);
                    console.log('_______________________');
                    $(this).remove();
                }
            });
        })
    }

    async getCategories() {
        await this._categoryService.getCategory().then(res => {
            this.setState(state => {
                return {
                    ...state,
                    category: res.data
                }
            }, () => {
                console.log(this.state.category);
                this.reloadLibs();
            })
        })
    }

    updateCategories() {
        this.getCategories()
    }

    deleteCategory(idCategory, e) {
        e.preventDefault();

        this._categoryService.deleteCategory(Cookies.get('token'), idCategory).then((res, error) => {
            console.log(res);
            if (res && res.status === 200) {
                NotificationManager.success('Delete category success!', 'Success');
            }

            this.setState(state => {
                const indexPosition = state.category.findIndex(item => {
                    return item.idCategory.toString() === idCategory;
                })
                state.category.splice(indexPosition, 1);
                return {
                    ...state,
                    category: state.category
                }
            })
        }).catch((e) => {
            if (e && e.response) {
                console.log(e.response);
                if (e.response.status === 400) {
                    if (e.response.data && e.response.data.Message) {
                        NotificationManager.error('The category is in use! Can not delete.', 'Error');
                    } else {
                        NotificationManager.error('Delete category fail!', 'Error');
                    }
                } else {
                    NotificationManager.error('Delete category fail!', 'Error');
                }
            } else {
                e && console.log(e);
                NotificationManager.error('Something\' wrong!', 'Error');
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path={this.props.match.path} render={() => (
                    <div className="right_col" role="main">
                        <div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="x_panel">
                                        <div className="x_title">
                                            <h2>
                                                Category Overview
                                            </h2>
                                            <div className="colLine"></div>
                                            <Link to="/admin/category/create-new" className="btn btn-success">
                                                <h5>Create New</h5>
                                            </Link>
                                            <div className="clearfix" />
                                        </div>
                                        <div className="x_content">
                                            <table
                                                id="datatable"
                                                className="table table-striped table-bordered"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.category.map((item, i) => {
                                                        return (
                                                            <tr key={"category" + i.toString()}>
                                                                <td>{item['idCategory']}</td>
                                                                <td>{item['name']}</td>
                                                                <td>
                                                                    <Link to={"/admin/category/edit/" + item['idCategory'].toString()} className="btn btn-primary">Edit</Link>
                                                                    <button className="btn btn-primary" onClick={this.deleteCategory.bind(this, item['idCategory'].toString())}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} />

                <Route path={`${this.props.match.path}/create-new`} render={props => <AddCategory {...props} unmount={this.updateCategories.bind(this)}></AddCategory>} />
                <Route path={`${this.props.match.path}/edit/:id`} render={props => <EditCategory {...props} unmount={this.updateCategories.bind(this)}></EditCategory>} />
            </Switch>
        )
    }
}

export default Category;