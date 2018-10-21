import http from '../../services/http';

export default class CategoryService {
    constructor(){
        this._http = new http();
    }

    getCategory() {
        console.log('getCategory');
        const a = this._http.get('/src/admin/components/category/category.json');

        console.log(a);
    }
}