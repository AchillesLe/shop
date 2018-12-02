import http from '../../services/http';

export default class ProductService {
    constructor() {
        this._http = new http();
    }

    getProducts() {
        console.log('getProduct');
        return this._http.get('/product/get/page/');
    }

    getProductById(productId) {
        console.log('getProduct by id');
        return this._http.get('/product/getdetails/' + productId);
    }

    addProduct(token, data = {}) {
        console.log(token);
        console.log(data);

        return this._http.post('/product/add', data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    editProduct(token, data = {}, productId) {
        console.log(token);
        console.log(data);

        return this._http.put('/product/update/' + productId, data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    deleteProduct(token, productId) {
        console.log(token, productId);
        return this._http.delete('/product/delete/' + productId, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }
}