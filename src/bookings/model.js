import axios from 'axios';
import config from '../configs/config';
/*
 *  Tao cac phuong thuc de thao tac voi csdl 
 */
class BookingModel {

    static getRooms() {
        let url = `${config.apiUrl}/rooms?all=true`;
        return axios.get(url);
    }

    static getBookings(page  = 1, search = null) {
        let url = `${config.apiUrl}/bookings?page=${page}`;
        if(search) {
            url += `&search=${search}`;
        }

        return axios.get(url);
        
    }

    static getBooking(id) {
        return axios.get(`${config.apiUrl}/bookings/${id}`);
    }

    static deleteBooking(id) {
        return axios.delete(`${config.apiUrl}/bookings/${id}`);
    }

    static createBooking(data = {}) {
        return axios.post(`${config.apiUrl}/bookings/create`, data);
    }

    static updateBooking(id, data = {}) {
        return axios.put(`${config.apiUrl}/bookings/${id}`, data);
    }

}

export default BookingModel;