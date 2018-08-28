import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import RoomModel from './model';
import {LoadingIndicator} from '../libs/libs';
import {FlashData} from '../libs/libs';
class Roomshow extends Component {

    state = {
        number: '',
        type: 'single',
        min: 1,
        max: 2,
        hasWifi: true,
        price: 0,
        errors: null,
        redirect: false,
        loading: true
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [target.name] : value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.loading){
            this.setState({
                loading: true
            });
        }

        RoomModel.updateRoom(this.props.match.params.id, {
            number: this.state.number,
            type: this.state.type,
            min: this.state.min,
            max: this.state.max,
            hasWifi: this.state.hasWifi ? 1 : 0,
            price: this.state.price
            }).then(res => {
            if(res.data.message) {
                FlashData.set('message', res.data.message);
                this.setState({
                    redirect: true,
                    loading: false
                });
            }
            if(res.data.errors) {
                this.setState({
                    message: null,
                    errors: res.data.errors || null,
                    loading: false
                });
            }
        });
    }
    
    componentDidMount(){
        this.getRoom();
    }

    getRoom = () => {
        if(!this.state.loading){
            this.setState({
                loading: true
            });
        }
        RoomModel.getRoom(this.props.match.params.id).then(res => {
            this.setState({
                number: res.data.number,
                type: res.data.type,
                min: res.data.min,
                max: res.data.max,
                hasWifi: res.data.hasWifi ? 1 : 0,
                price: res.data.price,
                loading: false
            })
        });
    }

    render() {
        let {errors} = this.state;
        return (
            <div>
                {
                    this.state.redirect ? 
                    (<Redirect 
                        to="/Rooms"    
                    />) : 
                    (
                        <div>
                            <h4 className= "page-header">Thông tin phòng</h4>
                        <div className="mb-3">
                            <NavLink to = "/Rooms" className = "btn btn-outline-primary">
                            <i className="fas fa-long-arrow-alt-left"></i> Quay trở lại
                            </NavLink> &nbsp;
                            <LoadingIndicator
                            show = {this.state.loading}
                                width = {32}
                                height = {32}
                            />
                        </div>
        
                        <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                        <label>Room number</label>
                        <input 
                            type="number" 
                            className= { errors && errors.number ? " form-control is-invalid" : "form-control"} 
                            placeholder="Enter room number" 
                            name = "number"
                            value = {this.state.number}
                            onChange = {this.onChange}
                            disabled
                        />
                        <div className="invalid-feedback">
                            {errors ? errors.number : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Room type</label>
                        <select 
                            className= { errors && errors.type ? " form-control is-invalid" : "form-control"} 
                            name = "type"
                            value = {this.state.type}
                            onChange = {this.onChange}
                        >
                            <option value = "single" >Giường đơn</option>
                            <option value = "double" >Giường đôi</option>
                            <option value = "triple" >Giường ba</option>
                        </select>
                        <div className="invalid-feedback">
                            {errors ? errors.type : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Min people</label>
                        <input 
                            type="number" 
                            className= { errors && errors.min ? " form-control is-invalid" : "form-control"} 
                            placeholder="Min people" 
                            name="min"
                            value = {this.state.min}
                            onChange = {this.onChange}
                        />
                        <div className="invalid-feedback">
                            {errors ? errors.min : null}
                        </div>
                    </div>

                    <div className="form-group">
                        <label >Max people</label>
                        <input 
                            type="number" 
                            className= { errors && errors.max ? " form-control is-invalid" : "form-control"} 
                            placeholder="Max people" 
                            name="min"
                            value = {this.state.max}
                            onChange = {this.onChange}
                        />
                        <div className="invalid-feedback">
                            {errors ? errors.max : null}
                        </div>
                    </div>

                    <div className="form-group">
                        <h5 >Service</h5>
                        <div className="custom-control custom-checkbox mb-3">
                            <input 
                                name = "hasWifi"
                                checked = {this.state.hasWifi}
                                type="checkbox" 
                                className="custom-control-input" 
                                id="customControlValidation1" 
                                onChange = {this.onChange}
                            />
                            <label className="custom-control-label" htmlFor="customControlValidation1">Wifi</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label >Price</label>
                        <input 
                            type="number" 
                            className= { errors && errors.price ? " form-control is-invalid" : "form-control"} 
                            placeholder="Price" 
                            name="price"
                            value = {this.state.price}
                            onChange = {this.onChange}
                        />
                        <div className="invalid-feedback">
                            {errors ? errors.price : null}
                        </div>
                    </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        </div>             
                    )
                }
            </div>    
        );
    }
}

export default Roomshow;