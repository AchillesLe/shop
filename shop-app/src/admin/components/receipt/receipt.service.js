import http from '../../services/http';

export default class ReceiptService {
    constructor() {
        this._http = new http();
    }

    getReceipts(token = '') {
        console.log('getReceipt');
        return this._http.get('/receipt/getall', {
            headers: {
                'token': token
            }
        });
    }

    getReceiptById(token = '', receiptId) {
        console.log('getReceipt by id');
        return this._http.get('/receipt/getreceipt/' + receiptId, {
            headers: {
                'token': token
            }
        });
    }

    addReceipt(token, data = {}) {
        console.log(token);
        console.log(data);

        return this._http.post('/receipt/add', data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    editReceipt(token, data = {}, receiptId) {
        console.log(token);
        console.log(data);

        return this._http.put('/receipt/update/' + receiptId, data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    changeReceiptStatus(token, data = {}, receiptId) {
        console.log(token, receiptId, data);
        return this._http.post('/receipt/updatestatus/' + receiptId, data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }
}