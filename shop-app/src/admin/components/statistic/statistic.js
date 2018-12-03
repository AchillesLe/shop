import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
class Statistic extends Component{
    constructor(props){
        super(props)
        this.state = {
            dateFrom: new Date(),
            dateTo: new Date(+new Date() + 86400000),
        }
    }
    onChange = date => this.setState({ date })
    render(){
        return(
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
                                <form data-parsley-validate className="form-horizontal form-label-left" noValidate>
                                    <div className="row">
                                        <div className="form-group col-12 col-md-6">
                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Từ ngày <span className="required">*</span>
                                            </label>
                                            <DateTimePicker
                                            onChange={this.onHandleChange}
                                            value={this.state.dateFrom}
                                            />
                                        </div>
                                        <div className="form-group col-12 col-md-6">
                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Đến ngày <span className="required">*</span>
                                            </label>
                                            <DateTimePicker
                                            onChange={this.onHandleChange}
                                            value={this.state.dateTo}
                                            />
                                        </div>
                                    </div>
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            
                                            <button type="submit" ref="getDataStatistic" className="btn btn-success" >Create</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Statistic