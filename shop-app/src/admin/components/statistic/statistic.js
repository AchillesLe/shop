import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { NotificationManager } from "react-notifications";
import {Link} from 'react-router-dom';
import statisticService from "./statistic.service";
import {ExportExcel} from './exportExcel'
import formatPrice from "./../../../share/services/formatPrice";
import $ from 'jquery'
const moment = require("moment");
class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: new Date(),
      dateTo: new Date(+new Date() + 86400000),
      total: 0,
      receipts: []
    };

    this._statisticService = new statisticService();
  }
  componentDidMount(){
      this.reloadLibs()
  }
  reloadLibs() {
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
  // onChange = date => this.setState({ date })
  onChangeDateFrom = dateFrom => {
    this.refs.getDataStatistic.setAttribute("disabled", true);
    if (dateFrom < this.state.dateTo) {
      this.refs.getDataStatistic.removeAttribute("disabled");
    }
    this.setState({ dateFrom });
  };
  onChangeDateTo = dateTo => {
    this.refs.getDataStatistic.setAttribute("disabled", true);
    if (dateTo > this.state.dateFrom) {
      this.refs.getDataStatistic.removeAttribute("disabled");
    }
    this.setState({ dateTo });
  };
  parseDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  onSubmit = () => {
    const { dateFrom, dateTo } = this.state;
    var from = this.parseDate(dateFrom);
    var to = this.parseDate(dateTo);
    this._statisticService
      .getData(from, to)
      .then(res => {
        const { data } = res;
        if (data.total > 0) {
          this.setState({ total: data.total, receipts: data.data });
        } else {
          NotificationManager.warning(
            "Không có doanh thu trong khoảng thời gian này",
            "Thông báo"
          );
        }
      })
      .catch(error => {
        if (error.response) {
          NotificationManager.error(error.response.data.Message, "Lỗi");
        }
      });
  };
  render() {
    const { total, receipts } = this.state;
    console.log(total);
    return (
      <div className="right_col" role="main">
        <div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="x_panel">
                <div className="x_title">
                  <h2>Thống kê doanh thu</h2>
                  <div className="clearfix" />
                </div>
                <div className="x_content">
                  <br />
                  <div className="row">
                    <div className="form-group col-12 col-md-6">
                      <label
                        className="control-label col-md-3 col-sm-3 col-xs-12"
                        htmlFor="name"
                      >
                        Từ ngày <span className="required">*</span>
                      </label>
                      <DateTimePicker
                        onChange={this.onChangeDateFrom}
                        value={this.state.dateFrom}
                      />
                    </div>
                    <div className="form-group col-12 col-md-5">
                      <label
                        className="control-label col-md-3 col-sm-3 col-xs-12"
                        htmlFor="name"
                      >
                        Đến ngày <span className="required">*</span>
                      </label>
                      <DateTimePicker
                        onChange={this.onChangeDateTo}
                        value={this.state.dateTo}
                      />
                    </div>
             
                    <button type="submit" ref="getDataStatistic" onClick={this.onSubmit} className="btn btn-success">Create</button>
                  </div>
                  {total != 0?(<div className="x_content">
                    <table
                      id="datatable"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer's Name</th>
                          <th>Address</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Description</th>
                          <th>Total</th>
                          <th>Create Date</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {receipts.map(item => {
                          return [
                            <tr key={item.idReceipt}>
                                <td>{item.idReceipt}</td>
                                <td>{item.nameCustomer}</td>
                                <td>{item.address}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.description}</td>
                                <td>{formatPrice(item.total) + " VND"}</td>
                                <td>
                                    {moment(item["createdDate"]).format(
                                    "DD/MM/YYYY h:mm:ss a"
                                    )}
                                </td>
                                <td>
                                    <Link to="" className="btn btn-primary"                               >
                                    View Detail
                                    </Link>
                                </td>
                            </tr>
                          ];
                        })}
                      </tbody>
                    </table>
                    <ExportExcel data={receipts}/>
                    <p className="text-right">Total: {formatPrice(total) + " VND"}</p>
                  </div>):''}
                  <div className="clearfix" />
                </div>
                {/* {total != 0?:''} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Statistic;
