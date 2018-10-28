import http from '../../services/http';

export default class LogInService {
    constructor() {
        this._http = new http();
    }

    logIn(userInfo) {
        return this._http.post('/login',userInfo);
    }
}