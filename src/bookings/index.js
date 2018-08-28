import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import BookingList from './list';
import BookingCreate from './create';
import Bookingshow from './show';


class BookingCenter extends Component {

    constructor(props){
        super(props);
        document.title = "Quản lý đặt phòng"
    }

    render() {

        return (
            <div>
                <Switch >
                    <Route 
                        exact
                        path = "/"
                        component = {BookingList}
                    />
                    {/*
                        hien thi o trang chu nhu trong Bookings
                    */}

                    <Route
                        exact 
                        path = "/Bookings"
                        component = {BookingList}
                    />

                    <Route 
                        exact 
                        path = "/Bookings/create"
                        component = {BookingCreate}
                    />

                    <Route 
                        exact 
                        path = "/Bookings/:id"
                        component = {Bookingshow}
                    />
                </Switch>
            </div>
        );
    }
}

export default BookingCenter;