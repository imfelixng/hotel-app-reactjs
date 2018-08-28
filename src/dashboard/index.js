import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'query-string';

class DashboardCenter extends Component {

    componentDidMount() {
        axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
               dashboard 
            </div>
        );
    }
}

export default DashboardCenter;