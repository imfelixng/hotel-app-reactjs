import axios from 'axios';
import config from '../configs/config';
/*
 *  Tao cac phuong thuc de thao tac voi csdl 
 */
class UserModel {

    static demo = 5;

    static getUsers(page  = 1, search = null) {
        let url = `${config.apiUrl}/users?page=${page}`;
        if(search) {
            url += `&search=${search}`;
        }

        return axios.get(url);
        
    }

    static getUser(id) { 
        return axios.get(`${config.apiUrl}/users/${id}`);
    }

    static deleteUser(id) { 
        return axios.delete(`${config.apiUrl}/users/${id}`);
    }

    static createUser(data = {}) {
        return axios.post(`${config.apiUrl}/users/create`, data);
    }

    static updateUser(id, data = {}) {
        return axios.put(`${config.apiUrl}/users/${id}`, data);
    }

}

export default UserModel;