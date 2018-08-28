import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import UserList from './list';
import UserCreate from './create';
import UserShow from './show';


class UserCenter extends Component {

    constructor(props){
        super(props);
        document.title = "Quản lý người dùng";
    }

    render() {

        return (
            <div>
                <Switch >
                    <Route 
                        exact
                        path = "/"
                        component = {UserList}
                    />
                    {/*
                        hien thi o trang chu nhu trong users
                    */}

                    <Route
                        exact 
                        path = "/users"
                        component = {UserList}
                    />

                    <Route 
                        exact 
                        path = "/users/create"
                        component = {UserCreate}
                    />

                    <Route 
                        exact 
                        path = "/users/:id"
                        component = {UserShow}
                    />
                </Switch>
            </div>
        );
    }
}

export default UserCenter;