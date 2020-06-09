import React, { Component, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { getOneOrder, deleteOrders} from '../actions/orders'


class Transactions extends Component {
    state= {
        orderId: ""
    }

    static PropTypes = {
        getOneOrder: PropTypes.func.isRequired,
        deleteOrders: PropTypes.func.isRequired
    }

    handleChange = e => {this.setState({[e.target.name]:e.target.value})}
    
    handleClick = ()=>{
        console.log("really")
        this.props.getOneOrder(this.state.orderId)
    }

    render() {
        return (
            <div className="container">
            <h1>Search order sumary</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange = {this.handleChange}
                        name="orderId"
                        placeholder="Order ID"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.handleClick} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>

                <div className="card">
                    {this.props.order}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    order: state.orders.order
})

export default connect(mapStateToProps,{getOneOrder})(Transactions)
