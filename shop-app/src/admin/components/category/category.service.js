import http from '../../services/http';

export default class CategoryService {
    constructor() {
        this._http = new http();
    }

    getCategory() {
        console.log('getCategory');
        return this._http.get('/category/getall');
    }

    getCategoryById(categoryId) {
        console.log('getCategory by id');
        return this._http.get('/category/getdetails/' + categoryId);
    }

    addCategory(token, data = {}) {
        console.log(token);
        console.log(data);

        return this._http.post('/category/add', data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    editCategory(token, data = {}, categoryId) {
        console.log(token);
        console.log(data);

        return this._http.put('/category/edit/' + categoryId, data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    deleteCategory(token, categoryId) {
        return this._http.delete('/category/delete/' + categoryId, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }
}