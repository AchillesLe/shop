import React, { Component } from 'react';

//CSS
import './receipt.css';

//JS
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';

import receiptService from './receipt.service';
import { Form, Text, TextArea, Select, Option } from 'informed';

import defaultImage from "./../../../assets/images/app/default-placeholder.png";
import formatPrice from './../../../share/services/formatPrice';

const moment = require('moment');

const Cookies = require('js-cookie');

class ReceiptDetails extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            receipt: {
            }
        }
        this._receiptService = new receiptService();
    }

    componentWillUnmount() {
        console.log('ReceiptDetails componentWillUnmount');
    }

    componentWillMount() {
        console.log('ReceiptDetails componentWillMount');

        this.getReceiptById(this.props.match.params.id);
    }

    async getReceiptById(id) {
        await this._receiptService.getReceiptById(Cookies.get('token'), id).then((res, error) => {
            this.setState(state => {
                return {
                    ...state,
                    receipt: res.data || {},
                }
            })
        })
        console.log(this.state.receipt);
    }

    render() {
        return (
            <div className="right_col" role="main">
                <div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Receipt Details</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <br />
                                    {
                                        this.state.receipt && Object.keys(this.state.receipt).length === 0 ? "" :
                                            <Form className="form-horizontal form-label-left">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="idReceipt">Id
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="idReceipt" className="form-control col-md-7 col-xs-12" initialValue={this.state.receipt.idReceipt} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label col-md-2 col-sm-2 col-xs-12" htmlFor="nameCustomer">Customer Name
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="nameCustomer" className="form-control col-md-7 col-xs-12" initialValue={this.state.receipt.nameCustomer} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address" className="control-label col-md-2 col-sm-2 col-xs-12">Address </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="address" className="form-control col-md-7 col-xs-12" initialValue={this.state.receipt.address} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="phone" className="control-label col-md-2 col-sm-2 col-xs-12">Phone </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="phone" className="form-control col-md-7 col-xs-12" initialValue={this.state.receipt.phone} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="control-label col-md-2 col-sm-2 col-xs-12">Email </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="email" className="form-control col-md-7 col-xs-12" initialValue={this.state.receipt.email} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="status" className="control-label col-md-2 col-sm-2 col-xs-12">Status</label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Select disabled field="status" className="form-control" initialValue={this.state.receipt.status} >
                                                                    <Option key="0" value="0">
                                                                        Waiting Confirm
                                                                    </Option>
                                                                    <Option key="1" value="1">
                                                                        Confirmed
                                                                    </Option>
                                                                    <Option key="2" value="2">
                                                                        Cancel
                                                                    </Option>
                                                                    <Option key="3" value="3">
                                                                        Done
                                                                    </Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description" className="control-label col-md-2 col-sm-2 col-xs-12">Description</label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <TextArea disabled field="description" className="form-control col-md-7 col-xs-12" initialValue={this.state.receipt.description} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="total" className="control-label col-md-2 col-sm-2 col-xs-12">Total</label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <Text disabled field="total" className="form-control col-md-7 col-xs-12" initialValue={formatPrice(this.state.receipt.total) + ' VND'} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="detailReceipts" className="control-label col-md-2 col-sm-2 col-xs-12">Products</label>
                                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                                                <div className="x_panel">
                                                                    <div className="x_content">
                                                                        <table
                                                                            id="datatable"
                                                                            className="table table-striped table-bordered"
                                                                        >
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Avatar</th>
                                                                                    <th>Code</th>
                                                                                    <th>Name</th>
                                                                                    <th>Category</th>
                                                                                    <th>Made in</th>
                                                                                    <th>Price</th>
                                                                                    <th>Quantity</th>
                                                                                    <th>Create Date</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {this.state.receipt.detailReceipts.map((item, i) => {
                                                                                    return [
                                                                                        <tr key={i}>
                                                                                            <td>
                                                                                                <div className="cell-image">
                                                                                                    <img alt="Avatar" src={item['Product']['avatar'] ? item['Product']['avatar'] : defaultImage}></img>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>{item['Product']['code']}</td>
                                                                                            <td>{item['Product']['name']}</td>
                                                                                            <td>{item['Product']['categoryName']}</td>
                                                                                            <td>{item['Product']['madein']}</td>
                                                                                            <td>{formatPrice(item['Product']['priceOut']) + ' VND'}</td>
                                                                                            <td>{item['Product']['quantity']}</td>
                                                                                            <td>{moment(item['Product']['createdDate']).format('DD/MM/YYYY h:mm:ss a')}</td>
                                                                                        </tr>

                                                                                    ];
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ln_solid" />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-2">
                                                                <a className="btn btn-primary" href="javascript:history.back()">Back</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReceiptDetails;