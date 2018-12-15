/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//CSS
import './receipt.css';

//JS
import $ from 'jquery';

import {
    Route,
    Switch
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Form, Select, Option } from 'informed';

import receiptService from './receipt.service';

import defaultImage from "./../../../assets/images/app/default-placeholder.png";

import formatPrice from './../../../share/services/formatPrice';
import { stat } from 'fs';

import ReceiptDetails from './receiptDetails';

const moment = require('moment');

const Cookies = require('js-cookie');

class Receipt extends Component {

    constructor() {
        super();
        this.state = {
            receipts: [],
            status: [],
            selectedStatus: -1
        }
        this._receiptService = new receiptService();
    }

    componentDidMount() {
        console.log('Receipt componentDidMount');
        this.getReceipts();
    }

    reloadLibs() {
        console.log('Receipt reloadLibs');

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

    async getReceipts() {
        await this._receiptService.getReceipts(Cookies.get('token')).then(res => {
            this.setState(state => {
                return {
                    ...state,
                    receipts: res.data
                }
            }, () => {
                console.log(this.state.receipts);
                this.reloadLibs();
            })
        })
    }

    updateReceipts() {
        this.getReceipts();
    }

    changeReceiptStatus(idReceipt, newStatus, e) {
        e.preventDefault();

        const data = {
            status: newStatus
        }

        this._receiptService.changeReceiptStatus(Cookies.get('token'), data, idReceipt).then((res, error) => {
            console.log(res);
            if (res && res.status === 200) {
                NotificationManager.success('Change status success!', 'Success');

                this.setState(state => {
                    const indexPosition = state.receipts.findIndex(item => {
                        return item.idReceipt.toString() === idReceipt;
                    })

                    state.receipts[indexPosition].status = newStatus;
                    return {
                        ...state
                    }
                })
            }
        }).catch((e) => {
            if(e && e.response) {
                console.log(e.response);
                if (e.response.status === 400) {
                    if (e.response.data && e.response.data.Message) {
                        if(e.response.data.Message === "Username đã tồn tại !") {
                            NotificationManager.error("Username already existed!", 'Error');
                        } else if(e.response.data.Message === "CMND đã tồn tại !"){
                            NotificationManager.error("Identity Card already existed!", 'Error');
                        } else {
                            NotificationManager.error(e.response.data.Message, 'Error');
                        }
                    } else {
                        NotificationManager.error('Something wrong!', 'Error');
                        // this.props.history.push('/admin')
                    }
                }
            } else {
                e && console.log(e);
                NotificationManager.error('Something wrong!', 'Error');
            }
        })
    }

    fakeClick() {
        NotificationManager.error('Data still not prepared yet!', 'Error');
    }

    chooseStatusFormChange(formState) {
        this.setState(state => {
            return {
                ...state,
                selectedStatus: formState.values.status
            }
        })
    }

    formChange(i, formState) {
        formState.values.status = parseInt(formState.values.status);

        const newStatus = {
            ...formState.values,
            index: i
        }

        this.setState(state => {
            if (state.status[i]) {

                state.status[i] = newStatus;
                return {
                    ...state
                }

            } else {

                return {
                    ...state,
                    status: [...state.status, newStatus]
                }

            }
        }, () => {
            console.log(this.state);
        })
    }

    render() {
        // $('#datatable').DataTable().clear();

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
                                                Receipt Overview
                                            </h2>
                                            <div className="colLine"></div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <Form style={{paddingTop: '8px'}} onChange={this.chooseStatusFormChange.bind(this)}>
                                                    <Select field="status" className="form-control" initialValue="-1">
                                                        <Option key="-1" value="-1">
                                                            Choose status...
                                                        </Option>
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
                                                </Form>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                        <div className="x_content">
                                            <table
                                                id="datatable"
                                                className="table table-striped table-bordered"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Customer Name</th>
                                                        <th>Address</th>
                                                        <th>Phone</th>
                                                        <th>Description</th>
                                                        <th>Total</th>
                                                        <th>Status</th>
                                                        <th>Amounts</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        !this.state.receipts || (this.state.receipts && Object.keys(this.state.receipts).length === 0) ? <tr></tr> :
                                                            this.state.receipts.map((item, i) => {
                                                                return item['status'].toString() !== this.state.selectedStatus && this.state.selectedStatus !== '-1' ? <tr key={i}></tr> : (
                                                                    <tr key={i}>
                                                                        <td>{item['idReceipt']}</td>
                                                                        <td>{item['nameCustomer']}</td>
                                                                        <td>{item['address']}</td>
                                                                        <td>{item['phone']}</td>
                                                                        <td>{item['description']}</td>
                                                                        <td>{formatPrice(item['total']) + ' VND'}</td>
                                                                        <td>
                                                                            <Form onChange={this.formChange.bind(this, i)}>
                                                                                <Select field="status" className={this.state.status[i] && this.state.status[i].status === item['status'] ? "form-control" : "form-control receipt--has-change"} initialValue={item['status']} disabled={item['status'] === 2 || item['status'] === 3}>
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
                                                                            </Form>
                                                                        </td>
                                                                        <td>{item['detailReceipts'].length + " Products"}</td>
                                                                        <td>
                                                                            <button className="btn btn-primary" onClick={this.state.status[i] ? this.changeReceiptStatus.bind(this, item['idReceipt'].toString(), this.state.status[i].status) : this.fakeClick.bind(this)}>Save Status</button>
                                                                            <Link to={"/admin/receipt/details/" + item['idReceipt'].toString()} className="btn btn-primary">View Details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )} />


                <Route path={`${this.props.match.path}/details/:id`} render={props => <ReceiptDetails {...props} ></ReceiptDetails>} />
            </Switch>
        )
    }
}

export default Receipt;