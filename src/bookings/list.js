import React, { Component } from 'react';
import BookingModel from './model';
import {NavLink} from 'react-router-dom';
import {Pagination} from '../libs/libs';
import queryString from 'query-string';
import {FlashData, LoadingIndicator} from '../libs/libs';
import moment from 'moment';

class DeleteButton extends Component {

    setBooking = (e) => {
        e.preventDefault();
        this.props.setBooking(this.props.Booking);
    }

    render() {

        return (
            <NavLink  
                onClick = {this.setBooking}
                to = {`/Bookings/${this.props.Booking.id}`}
                className = "btn btn-danger mx-1"
                data-toggle="modal" data-target="#exampleModal"
                >
                <i className="fa fa-times text-light"></i>
            </NavLink>
        )
        
    }
}

class BookingList extends Component {
    currentPage = 1;
    timeoutID = 0;
    firstInit = 1;
    ownBooking = null;
    jQuery = window.jQuery;
    bookingTypes = {
        0: 'Đang chờ',
        1: 'Từ chối',
        2: 'Chấp nhận',
        3: 'Đã đặt cọc',
        4: 'Hoàn tất'
    }
    constructor(props) {
        super(props);

        const message = FlashData.get('message');
        this.state = {
            message: message,
            error: null,
            loading: true,
            Bookings: null,
            search: queryString.parse(props.location.search).search || ''
        }

        this.currentPage = queryString.parse(props.location.search).page || 1;

    }

    componentDidMount(){
        this.getBookings();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.search !== nextProps.location.search) {
            this.currentPage = queryString.parse(nextProps.location.search).page || 1;
            this.getBookings(nextProps);
            this.setState({
                message: null,
                error: null
            })
        }
    }


    handleChange = (e) => {
        clearTimeout(this.timeoutID);
        this.setState({
            search: e.target.value
        });

        this.currentPage = 1;

        this.timeoutID = setTimeout(() => {
            this.getBookings(this.props, 1);
        }, 300);


    }

    deleteBooking = () => {
        if(this.ownBooking){
            BookingModel.deleteBooking(this.ownBooking.id).then(res => {
                if(res.data.message) {
                    this.state.Bookings.data.splice(this.state.Bookings.data.indexOf(this.ownBooking), 1);
                    this.setState({
                        message: res.data.message || null,
                        error: null
                    });
                }
                if(res.data.error) {
                    this.setState({
                        message: null,
                        error: res.data.error || null
                    });
                }
                
            });
        }

        this.jQuery('.modal').modal('hide');
    }

    getBookings = (props = this.props, forcePage = null) => {
        if(!this.state.loading){
            this.setState({
                loading: true
            });
        }
        let page = 1;
        let search = this.state.search || '';
        let uri = props.location.search ? queryString.parse(props.location.search) : '';
        if(uri) {
            page = uri.page || 1;
            if(this.currentPage !== page){
                page = this.currentPage;
            }
        }

        //Uu tien trang duoc tai
        if(forcePage) {
            page = forcePage;
        }

       if(uri !== ''){
        search = uri.search || '';
       }

        if(this.firstInit !== 1 && this.state.search !== search){
            search = this.state.search;
        }
        
        //trang da load lai
        this.firstInit = 0;

        //console.log(search);

        BookingModel.getBookings(page, search).then(res => {
            this.setState({
                Bookings: res.data,
                search: search,
                loading: false
            })
        })
    }

    showListBooking = (Bookings) => {
        let result = null;
        if(this.state.Bookings !== null && Bookings.data.length > 0 ) {
            result = Bookings.data.map((Booking,index) => {
                return (
                    <tr key = {index}>
                        <td>{index + 1 + (this.state.Bookings.current_page - 1) * this.state.Bookings.per_page}</td>
                        <td>{Booking.id}</td>
                        <td>{Booking.guestName}</td>
                        <td>{Booking.guestPhone}</td>
                        <td>{moment.unix(Booking.checkin).format('DD-MM-YYYY')}</td>
                        <td>{this.bookingTypes[Booking.status]}</td>
                        <td>
                            <NavLink to = {`/Bookings/${Booking.id}`} className="btn btn-info mx-1">
                                <i className="fa fa-eye text-light"></i>
                            </NavLink>
                            <DeleteButton 
                                Booking = {Booking}
                                setBooking = {this.setBooking}
                            />
                        </td>
                    </tr>
                    
                );
            });
        }else{
            return <tr>
                        <td colSpan = {6}>Khong co du lieu</td>
                    </tr>
        }

        return result;
    }

    refreshList = () => {
        this.setState({
            message: null,
            error: null
        })
        this.getBookings();
    }

    setBooking = (Booking) => {
        this.ownBooking = Booking
    }

    render() {
        let {Bookings} = this.state;
        return (
            <div>
                <h4 className= "page-header">Danh sách phòng</h4>
                <div className="mb-3">
                    <NavLink to = "/Bookings/create" className = "btn btn-primary">
                       <i className= "fa fa-plus"></i> Đặt phòng
                    </NavLink> &nbsp;
                    <button className= "btn btn-outline-dark" onClick = {this.refreshList}> <i className= "fa fa-sync-alt"></i> Tải lại trang</button>
                        &nbsp;  
                    <form className = "form-inline" style={
                        {
                            display: 'inline-block'
                        }
                    }>
                        <input 
                        type="text" 
                        className = "form-control" 
                        name="Search" 
                        placeholder="Tìm kiếm"
                        value = {this.state.search}
                        onChange = {this.handleChange}
                        />
                    </form>   
                    <LoadingIndicator
                        show = {this.state.loading}
                        width = {32}
                        height = {32}
                    /> 
                </div>

                {
                    this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }

                {
                    this.state.message &&
                    <div className="alert alert-success">{this.state.message}</div>
                }

                <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Tên Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Checkin</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {this.showListBooking(Bookings)}
                </tbody>
            </table>
            
            <nav className="d-flex justify-content-center">
                <Pagination 
                    data = {this.state.Bookings}
                    range = {2}
                    to = "Bookings"
                    search = {this.state.search}
                />
            </nav>

            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Ban chac chan muon xoa Booking nay?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                  <button onClick = {this.deleteBooking}type="button" className="btn btn-info">Confirm</button>
                </div>
              </div>
            </div>
            </div>
            </div>
        );
    }
}

export default BookingList;