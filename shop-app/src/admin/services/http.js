import axios from 'axios';

export default class HTTP {
    constructor(){
        this.instance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
        });
    }

    get(url = '', data = '') {
        console.log('get');
        return this.instance.get(url, data)
    }
}