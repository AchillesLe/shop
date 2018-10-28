import axios from 'axios';

export default class HTTP {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost/BanHangAPI/api/',
            //timeout: 1000,
        });
    }

    get(url = '', config = {}) {
        console.log('get');
        return this.instance.get(url, config)
    }

    post(url = '', data = {}, config = {}) {
        console.log('post');
        return this.instance.post(url, data, config)
    }
}