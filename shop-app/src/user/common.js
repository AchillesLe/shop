import _ from 'lodash'
import partial from 'lodash/partial'
import split from 'lodash/split'

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