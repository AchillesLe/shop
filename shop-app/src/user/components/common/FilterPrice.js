import React from 'react'
import {currencyParser} from './../../services'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export const FilterPrice =({rangeChange,min=10000,max=2000000})=>{
    return (
        <div className="widget price mb-50">
            <h6 className="widget-title mb-30">Lọc theo</h6>
            <p className="widget-title2 mb-30">Giá</p>
            <div className="widget-desc">
            <Range onChange={(value)=>rangeChange(value)} min={10000} max={2000000} step={10000} defaultValue={[0,2000000]}/>
                <div className="range-price">Khoảng: {currencyParser(min)} - {currencyParser(max)}</div>
            </div>
        </div>
    )
}