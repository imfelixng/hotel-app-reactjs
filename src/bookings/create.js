import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import BookingModel from './model';
import {LoadingIndicator} from '../libs/libs';
import {FlashData} from '../libs/libs';

const jQuery = window.jQuery;
class BookingCreate extends Component {

    data = {
        checkin: 0,
        checkout: 0
    }

    constructor(props){
        super(props);
        document.title = "Tạo đặt phòng"
    }

    state = {
        guestName: '',
        guestPhone: '',
        deposit: 0,
        adults: 1,
        kids: 0,
        checkin: '',
        checkout: '',
        status: 0,
        rooms: [],
        selectedRoom: [],
        errors: null,
        redirect: false,
        loading: false
    }

    componentDidMount() {
        const that = this;
        jQuery('.datepicker').pickadate({
            format: 'dd-mm-yyyy',
            onSet: function({select}) { //ko dung arrow function de tranh bi ghi de this
                const name = this.$node[0].name;
                that.setState({
                    [name]: this.get()
                });
                that.data[name] = (select/1000) + 12 * 3600;
            }

        });
        this.getRooms();
    }

    getRooms = () => {
        BookingModel.getRooms().then(res => {
            this.setState({
                rooms: res.data
            });
        })
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let selectedOptions = target.selectedOptions;
        
        if(target.multiple === true && selectedOptions) {
            let selectedValues = [];
            for (let i = 0 ; i < selectedOptions.length; i++) {
                selectedValues.push(selectedOptions[i].value)
            }
            this.setState({
                selectedRoom: selectedValues
            })
        }else {
            this.setState({
                [target.name] : value
            });
        }


    }

    onSubmit = (e) => {
        e.preventDefault();
            this.setState({
                loading: true
            });
        BookingModel.createBooking({
            guestName: this.state.guestName,
            guestPhone: this.state.guestPhone,
            deposit: this.state.deposit,
            adults: this.state.adults,
            kids: this.state.kids,
            checkin: this.data['checkin'],
            checkout: this.data['checkout'],
            status: this.state.status,
            rooms: this.state.selectedRoom,
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

    render() {
        let {errors} = this.state;
        return (
            <div>
                {
                    this.state.redirect ? 
                    (<Redirect 
                        to="/Bookings"
                    />) : 
                    (
                        <div>
                            <h4 className= "page-header">Đặt phòng</h4>
                        <div className="mb-3">
                            <NavLink to = "/Bookings" className = "btn btn-outline-primary">
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
                                <label>Guest name</label>
                                <input 
                                    type="text" 
                                    className= { errors && errors.guestName ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Enter guest name"
                                    name = "guestName"
                                    value = {this.state.guestName}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.guestName : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Guest phone</label>
                                <input 
                                    type="text" 
                                    className= { errors && errors.guestPhone ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Enter guest phone"
                                    name = "guestPhone"
                                    value = {this.state.guestPhone}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.guestPhone : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Deposit</label>
                                <input 
                                    type="number" 
                                    className= { errors && errors.deposit ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Deposit" 
                                    name="deposit"
                                    value = {this.state.deposit}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.deposit : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label >Adults</label>
                                <input 
                                    type="number" 
                                    className= { errors && errors.adults ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Max people" 
                                    name="adults"
                                    value = {this.state.adults}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.max : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label >Kids</label>
                                <input 
                                    type="number" 
                                    className= { errors && errors.kids ? " form-control is-invalid" : "form-control"} 
                                    placeholder="Max people" 
                                    name="kids"
                                    value = {this.state.kids}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.kids : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label >Checkin</label>
                                <input 
                                    type="text" 
                                    className= { errors && errors.checkin ? " form-control is-invalid datepicker" : "form-control datepicker"} 
                                    placeholder="Checkin" 
                                    name="checkin"
                                    value = {this.state.checkin}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.checkin : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label >Checkout</label>
                                <input 
                                    type="text" 
                                    className= { errors && errors.checkout ? " form-control is-invalid datepicker" : "form-control datepicker"} 
                                    placeholder="Checkout" 
                                    name="checkout"
                                    value = {this.state.checkout}
                                    onChange = {this.onChange}
                                />
                                <div className="invalid-feedback">
                                    {errors ? errors.checkout : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label >Status</label>
                                <select 
                                    className= { errors && errors.status ? " form-control is-invalid" : "form-control"} 
                                    name = "status"
                                    value = {this.state.status}
                                    onChange = {this.onChange}
                                >
                                    <option value = {0} >Đang chờ</option>
                                    <option value = {1} >Từ chối</option>
                                    <option value = {2} >Chấp nhận</option>
                                    <option value = {3} >Đã đặt cọc</option>
                                    <option value = {4} >Hoàn tất</option>
                                </select>
                                <div className="invalid-feedback">
                                    {errors ? errors.status : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label >Rooms</label>
                                <select 
                                    multiple
                                    className= { errors && errors.rooms ? " form-control is-invalid" : "form-control"} 
                                    name = "selectedRoom"
                                    value = {this.state.selectedRoom}
                                    onChange = {this.onChange}
                                >
                                    {this.state.rooms.length > 0 &&
                                        this.state.rooms.map((roomItem, index) => (
                                            <option key = {index} value = {roomItem.id} >{roomItem.number}</option>
                                        ))
                                    }
                                </select>
                                <div className="invalid-feedback">
                                    {errors ? errors.rooms : null}
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

export default BookingCreate;