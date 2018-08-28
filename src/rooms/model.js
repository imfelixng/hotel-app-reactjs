import axios from 'axios';
import config from '../configs/config';
/*
 *  Tao cac phuong thuc de thao tac voi csdl 
 */
class RoomModel {

    static demo = 5;

    static getRooms(page  = 1, search = null) {
        let url = `${config.apiUrl}/rooms?page=${page}`;
        if(search) {
            url += `&search=${search}`;
        }

        return axios.get(url);
        
    }

    static getRoom(id) { 
        return axios.get(`${config.apiUrl}/rooms/${id}`);
    }

    static deleteRoom(id) { 
        return axios.delete(`${config.apiUrl}/rooms/${id}`);
    }

    static createRoom(data = {}) {
        return axios.post(`${config.apiUrl}/rooms/create`, data);
    }

    static updateRoom(id, data = {}) {
        return axios.put(`${config.apiUrl}/rooms/${id}`, data);
    }

}

export default RoomModel;