import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Customer_form from './Customer_form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addCustomers } from '../actions/customers'

class Order extends Component {
    state = {
        lastName: "",
        firstName: "",
        email: "",
        number: "",
        address: "",
        city: "",
        state: "",
        zipcode: ""
    };

    static PropTypes = {
        addCustomers: PropTypes.func.isRequired
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("submit");
        const { lastName, firstName, email, number, address, city, state, zipcode } = this.state;
        const customer = { lastName, firstName, email, number, address, city, state, zipcode };
        console.log(customer)
        this.props.addCustomers(customer)
    }

    handleClick = event => this.setState({[event.target.name]: event.target.value})

    render() {
        return (
            <div className="container">
                <Customer_form handler={this.handleClick} />
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
            </Button>
            </div>)
    }
}

export default connect(null, { addCustomers })(Order);

