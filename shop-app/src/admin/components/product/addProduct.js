import React, { Component } from 'react';

//CSS
import './product.css';

//JS
import $ from 'jquery';
import {NotificationManager} from 'react-notifications';

import categoryService from './../category/category.service';
import productService from './product.service';
import { Form, Text, TextArea, Select, Option } from 'informed';

import defaultImage from "./../../../assets/images/app/default-placeholder.png";

const Cookies = require('js-cookie');

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            product: {
            },
            avatar: '',
            images: '',
        }
        this._productService = new productService();
        this._categoryService = new categoryService();
    }

    componentWillUnmount() {
        console.log('AddProduct componentWillUnmount');
        this.props.unmount();
    }

    componentDidMount() {
        console.log('AddProduct componentDidMount');
        this.getCategories();
    }

    async getCategories() {
        await this._categoryService.getCategory().then(res => {
            this.setState(state => {
                return {
                    ...state,
                    categories: res.data
                }
            }, () => {
                console.log(this.state.categories);
            })
        })
    }

    cancel() {
        this.props.history.push('/admin/product');
    }

    resetForm() {
        this.setState(state => {
            return {
                ...state,
                product: {
                },
                avatar: '',
                images: '',
            }
        })
    }

    async addProduct(e) {
        e.preventDefault();
        this.refs.addProductButton.setAttribute("disabled", "disabled");

        console.log('addProduct', this.state.product);

        if (this.state.avatar) {
            await this.setState(state => {
                return {
                    ...state,
                    product: {
                        ...state.product,
                        avatar: state.avatar
                    }
                }
            })
        }

        if (this.state.images) {
            await this.setState(state => {
                return {
                    ...state,
                    product: {
                        ...state.product,
                        images: state.images
                    }
                }
            })
        }

        this._productService.addProduct(Cookies.get('token'), this.state.product).then((res, error) => {
            console.log(res);
            if(res && res.status === 200) {
                NotificationManager.success('Add product success!', 'Success');
            }

            this.props.history.push('/admin/product');
        }).catch((e) => {
            if (e && e.response) {
                console.log(e.response);
                NotificationManager.error('Add product fail!', 'Error');
            } else {
                e && console.log(e);
                NotificationManager.error('Something\' wrong!', 'Error');
            }
        })
    }

    formChange(formState) {
        this.setState(state => {
            return {
                ...state,
                product: {
                    ...state.product,
                    ...formState.values
                }
            }
        })
    }

    changeImage(e) {
        e.persist();
        const input = e.target;

        const reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            this.setState(state => {
                return {
                    ...state,
                    [$(input).attr('name')]: dataURL
                }
            })
        };

        reader.readAsDataURL(input.files[0]);
    }

    render() {
        return (
            <div className="right_col" role="main">
                <div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Create Product</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <br />
                                    <Form className="form-horizontal form-label-left" onChange={this.formChange.bind(this)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="name" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="code">Product Code <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="code" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="idCategory">Category <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Select field="idCategory" className="form-control col-md-7 col-xs-12" value="-1">
                                                            <Option key="-1" value>
                                                                Choose Category...
                                                            </Option>
                                                            {this.state.categories.map(category => {
                                                                return (<Option key={category.idCategory} value={category.idCategory}>{category.name}</Option>)
                                                            })}
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="priceIn" className="control-label col-md-2 col-sm-2 col-xs-12">Price In <span className="required">*</span></label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="priceIn" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="priceOut" className="control-label col-md-2 col-sm-2 col-xs-12">Price Out <span className="required">*</span></label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="priceOut" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quantity" className="control-label col-md-2 col-sm-2 col-xs-12">Quantity <span className="required">*</span></label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="quantity" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="length" className="control-label col-md-2 col-sm-2 col-xs-12">Length</label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="length" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="width" className="control-label col-md-2 col-sm-2 col-xs-12">Width</label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="width" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="madein" className="control-label col-md-2 col-sm-2 col-xs-12">Made in</label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <Text field="madein" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className="control-label col-md-2 col-sm-2 col-xs-12">Description</label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12">
                                                        <TextArea field="description" className="form-control col-md-7 col-xs-12" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="avatar">Avatar <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12 product_image-upload-container">
                                                        <Text field="avatar" className="form-control col-md-7 col-xs-12 product__image-upload" type="file" onChange={this.changeImage.bind(this)} />
                                                        <img alt="Avatar" src={this.state.avatar ? this.state.avatar : defaultImage}></img>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="images">Image <span className="required">*</span>
                                                    </label>
                                                    <div className="col-md-10 col-sm-10 col-xs-12 product_image-upload-container">
                                                        <Text field="images" className="form-control col-md-7 col-xs-12 product__image-upload" type="file" onChange={this.changeImage.bind(this)} />
                                                        <img alt="Images" src={this.state.images ? this.state.images : defaultImage}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ln_solid" />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="col-md-10 col-sm-10 col-xs-12 col-md-offset-2">
                                                        <button className="btn btn-primary" type="button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                        <button className="btn btn-primary" type="reset" onClick={this.resetForm.bind(this)}>Reset</button>
                                                        <button type="submit" ref="addProductButton" className="btn btn-success" onClick={this.addProduct.bind(this)}>Create</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProduct;