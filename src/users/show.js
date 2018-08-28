import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import UserModel from './model';
import {LoadingIndicator} from '../libs/libs';
import {FlashData} from '../libs/libs';
class UserShow extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: null,
        redirect: false,
        loading: true
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.loading){
            this.setState({
                loading: true
            });
        }
        let dataPassword = {}; //khong thay doi thi bo qua
        if(this.state.password) { //neu co thay doi password thi cap nhat vao
            dataPassword = {
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        }
        UserModel.updateUser(this.props.match.params.id, {
            name: this.state.name,
            email: this.state.email,
            ...dataPassword
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
        this.getUser();
    }

    getUser = () => {
        if(!this.state.loading){
            this.setState({
                loading: true
            });
        }
        UserModel.getUser(this.props.match.params.id).then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
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
                        to="/users"    
                    />) : 
                    (
                        <div>
                            <h4 className= "page-header">Thong tin nguoi dung</h4>
                        <div className="mb-3">
                            <NavLink to = "/users" className = "btn btn-outline-primary">
                            <i className="fas fa-long-arrow-alt-left"></i> Quay Tro Lai
                            </NavLink> &nbsp;
                            <LoadingIndicator
                            show = {this.state.loading}
                                width = {32}
                                height = {32}
                            />
                        </div>
        
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <label>Your name</label>
                                <input 
                                    type="text" 
                                    className= { errors && errors.name ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Enter your name" 
                                    name = "name"
                                    value = {this.state.name}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.name : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Email address</label>
                                <input 
                                    type="email" 
                                    className= { errors && errors.email ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Enter email" 
                                    name = "email"
                                    value = {this.state.email}
                                    onChange = {this.onChange}
                                />
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                <div className="invalid-feedback">
                                    {errors ? errors.email : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input 
                                    type="password" 
                                    className= { errors && errors.password ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Password" 
                                    name="password"
                                    value = {this.state.password}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.password : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Confirm password</label>
                                <input 
                                    type="password" 
                                    className= "form-control"
                                    placeholder=" Confirm password" 
                                    name = "password_confirmation"
                                    value = {this.state.password_confirmation}
                                    onChange = {this.onChange}
                                />
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

export default UserShow;