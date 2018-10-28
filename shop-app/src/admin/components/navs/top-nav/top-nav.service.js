import http from '../../../services/http';

export default class TopNavService {
    constructor() {
        this._http = new http();
    }

    logOut(token) {
        return this._http.get('/logout',{headers: { 'token' : token}});
    }
}