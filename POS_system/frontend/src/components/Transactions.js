import React, { Component, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Customer_form from './Customer_form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addCustomers } from '../actions/customers'
import { getGoods, addGoods } from '../actions/goods'
import { addOrders } from '../actions/orders'
import { addCarts } from '../actions/carts'

class Transactions extends Component {
    render() {
        return (
            <div className="container">
            <h1>Search order sumary</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Order ID"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}

export default Transactions
