import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import loadingGif from '../loading.gif';

export class FlashData {
    static data = {};

    static get(key) {
        if(this.data[key]){
            const data = this.data[key] || null;
            this.data[key] = null;
            return data;
        }
    }

    static set(key, value) {
        this.data[key] = value;
    }
}

export class Pagination extends Component {
    getUrl(page = 1) {
        let url = `/${this.props.to}?page=${page}`;
        if(this.props.search !== '') {
            url += `&search=${this.props.search}`;
        }
        return url;
    }

    render() {
        const data = this.props.data || undefined;
        if(data && data.data.length > 0 && data.last_page > 1) {
            //+so => de hieu la so
            const range = +this.props.range || 2;
            const currentPage = data.current_page;
            const lastPage = data.last_page;

            let pageLinks = [];

            //trang dau
            pageLinks.push(
                <li 
                    key = {0} 
                    className = {currentPage === 1 ? "page-item disabled" : "page-item"}
                >
                    <NavLink to = {this.getUrl()} className="page-link">Trang dau</NavLink>
                </li>
            );

            //ca trang o giua

            for ( let i = currentPage - range; i <= lastPage; i++) {
                if(i > 0 && i >= currentPage - range) {
                    if(currentPage === i) {
                       pageLinks.push(
                        <li 
                            key = {i} 
                            className = "page-item active"
                        >
                            <span className="page-link">{i}</span>
                        </li>
                    ) 
                    }else{
                        pageLinks.push(
                            <li 
                                key = {i} 
                                className = "page-item"
                            >
                                <NavLink to = {this.getUrl(i)} className="page-link">{i}</NavLink>
                            </li>
                        ) 
                    }
                }

                //khi dat du ca trang trai va trang phai
                if(i === currentPage + range) {
                    break;
                }
            }
            //trang cuoi
            pageLinks.push(
                <li 
                    key = {lastPage + 1} 
                    className = {currentPage === lastPage ? "page-item disabled" : "page-item"}
                >
                    <NavLink to = {this.getUrl(lastPage)} className="page-link">Trang cuoi</NavLink>
                </li>
            );

            return (
                <ul className="pagination">
                    {pageLinks}    
                </ul>
            );
        }
        return null;
    }
}

export class LoadingIndicator extends Component {
    render(){

        const style = {
            width: this.props.width || 64,
            height: this.props.height || 64,
            display: this.props.show === true ? 'inline-block' : 'none'
        }

        return <img 
            src = {loadingGif}
            alt = "login indicator"
            style = {style}
        />
    }
}

export class JSONP {
    static callbackPrefix = 'hotel_request_';
    static callbackId = 1;

    static getCallbackName() {
        return this.callbackPrefix + this.callbackId;
    }

    static get(url='', callback) {
        const callbackName = this.getCallbackName();
        const scriptTag = document.createElement('script');
        document.body.appendChild(scriptTag);

        
    }
}