
import axios from 'axios';
import { domainServer } from './../config'
import { NotificationManager} from 'react-notifications';
export const queryStringParser = (query) => {
    query = query.toString().replace("?", "")
    var params=[]
    var queries = query.split('&');
    for (var i = 0; i < queries.length; i++) {
        var temp = queries[i].split('=');//a[0] = key, a[1]=value 
        params[temp[0]] = temp[1];// query ?key=value => params[key] = value 
    }
    return params
}
export const currencyParser = (num) =>{
    var n =  num.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g,'$1,');
    var cur = n.split(".")
    return cur[0]

}
export const callAPI = (method,endpoint,data=null,headers={'Content-Type': 'application/json'})=>{
    return axios({
        method: method,
        url: `${domainServer}/${endpoint}`,
        data:data,
        headers: headers,
    }).catch(error=>{
        console.log(error)
        if(error.response){
            NotificationManager.error('Lỗi trong quá trình tạo đơn đặt hàng.', '');
        }
    });
}