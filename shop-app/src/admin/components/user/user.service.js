import http from '../../services/http';

export default class UserService {
    constructor() {
        this._http = new http();
    }

    getUsers(token) {
        console.log('getUser');
        return this._http.get('/user/getall', {
            headers: {
                'token': token
            }
        });
    }

    getUserById(token, userId) {
        console.log('getUser by id');
        return this._http.get('/user/getuser/' + userId, {
            headers: {
                'token': token
            }
        });
    }

    addUser(token, data = {}) {
        console.log(token);
        console.log(data);

        return this._http.post('/user/add', data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    editUser(token, data = {}, userId) {
        console.log(token);
        console.log(data);

        return this._http.put('/user/update/' + userId, data, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }

    deleteUser(token, userId) {
        console.log(token, userId);
        return this._http.delete('/user/delete/' + userId, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
    }
}