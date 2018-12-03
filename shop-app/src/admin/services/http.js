import axios from 'axios';

export default class HTTP {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:5000/api/',
            //timeout: 1000,
        });
    }

    get(url = '', config = {}) {
        return this.instance.get(url, config)
    }

    post(url = '', data = {}, config = {}) {
        return this.instance.post(url, data, config)
    }

    put(url = '', data = {}, config = {}) {
        return this.instance.put(url, data, config)
    }

    delete(url = '', config = {}) {
        return this.instance.delete(url, config)
    }
}