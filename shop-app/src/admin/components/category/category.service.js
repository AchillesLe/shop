import http from '../../services/http';

export default class CategoryService {
    constructor(){
        this._http = new http();
    }

    getCategory() {
        console.log('getCategory');
        return this._http.get('/category/getall');
    }

    addCategory(token, data = {}) {
        console.log(token);
        console.log(data);

        return this._http.post('/category/add',data,{
            headers: { 
                'token' : token,
                'Content-Type': 'application/json'
            }
        });
    }
}