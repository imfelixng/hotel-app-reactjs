import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import RoomList from './list';
import RoomCreate from './create';
import Roomshow from './show';


class RoomCenter extends Component {

    render() {

        return (
            <div>
                <Switch >
                    <Route 
                        exact
                        path = "/"
                        component = {RoomList}
                    />
                    {/*
                        hien thi o trang chu nhu trong Rooms
                    */}

                    <Route
                        exact 
                        path = "/Rooms"
                        component = {RoomList}
                    />

                    <Route 
                        exact 
                        path = "/Rooms/create"
                        component = {RoomCreate}
                    />

                    <Route 
                        exact 
                        path = "/Rooms/:id"
                        component = {Roomshow}
                    />
                </Switch>
            </div>
        );
    }
}

export default RoomCenter;