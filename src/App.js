import React, { Component } from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import UserCenter from './users/index';
import RoomCenter from './rooms/index';
import BookingCenter from './bookings/index';
import Dashboard from './dashboard/index';

class App extends Component {
  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className = "container">
            <NavLink className="navbar-brand" to="/">Hotel App</NavLink>
            <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard" activeClassName = "active">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users" activeClassName = "active">Quản Lý Người Dùng</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/rooms">Quản Lý Phòng</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bookings">Quản Lý Đặt Phòng</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>   
        
        <div className = "container my-2">
          <div className = "row">
            <div className = "col-md-12">
              <Route exact path = "/" component = {UserCenter}/>
              <Route path = "/dashboard" component = {Dashboard}/>
              <Route path = "/rooms" component = {RoomCenter}/>
              <Route path = "/users" component = {UserCenter} />
              <Route path = "/bookings" component = {BookingCenter} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
