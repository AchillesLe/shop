import http  from './../../services/http'
const Cookies = require('js-cookie');
export default class  StatisticService {
    constructor(){
        this._http = new http()
    }
    getData = (dateFrom,dateTo)=>{
        return this._http.get(`/statistic/getByRangeDate/?dateFrom=${dateFrom}&dateTo=${dateTo}`,{headers: {'token': Cookies.get('token')}})
    }
}