import React, { Component } from 'react';

class Content extends Component {

    render() {
        return (
            <div className="right_col" role="main">
                {/* top tiles */}
                <div className="row tile_count">
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user" /> Total Users</span>
                        <div className="count">2500</div>
                        <span className="count_bottom"><i className="green">4% </i> From last Week</span>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-clock-o" /> Average Time</span>
                        <div className="count">123.50</div>
                        <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc" />3% </i> From last Week</span>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user" /> Total Males</span>
                        <div className="count green">2,500</div>
                        <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc" />34% </i> From last Week</span>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user" /> Total Females</span>
                        <div className="count">4,567</div>
                        <span className="count_bottom"><i className="red"><i className="fa fa-sort-desc" />12% </i> From last Week</span>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user" /> Total Collections</span>
                        <div className="count">2,315</div>
                        <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc" />34% </i> From last Week</span>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user" /> Total Connections</span>
                        <div className="count">7,325</div>
                        <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc" />34% </i> From last Week</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;