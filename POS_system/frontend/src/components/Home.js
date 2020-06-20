import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import pic from '../assets/images/pos_bg.jpg'

class Home extends Component {
    render() {
            return (
                <div className="home_bg">
                    <h1 className="title">Welcome to Our Point of Sale System</h1>
                </div>
        );
    }
}

export default Home;

