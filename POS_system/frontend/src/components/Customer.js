import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';
import {getOrders} from '../actions/orders'
import { getCustomers, deleteCustomers } from '../actions/customers'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl, Card, NavItem } from 'react-bootstrap';
import Customer_details from './Customer_details'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

export class Customers extends Component {
    static propTypes = {
        customers: propTypes.array.isRequired,
        getCustomers: propTypes.func.isRequired,
        deleteCustomers: propTypes.func.isRequired
    }

    state = {
        number: "",
        customer: "",
        condition: false,
        order_condition: false,
        orderId: "",
        order:""
    }

    componentDidMount() {
        this.props.getCustomers();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClick() {
        this.setState(state => ({...state, order_condition:false, condition: false}))
        axios.get(`/api/customers/${this.state.number}`)
            .then(res => {
                this.setState(state => ({ ...state, customer: res.data, condition: true }))
            })
    }

    handleClickOrder= orderId => {
        this.setState(state => ({...state, condition:false, order_condition: false}))
        axios.get(`/api/orders/${orderId}`)
        .then(res => {
            this.setState(state => ({...state, order:res.data, order_condition: true}))
        })
    }

    condition(){
        if (this.state.condition == true) {
            return (
                <div className="card">
                    <Customer_details customer={this.state.customer} />
                </div>
            )
        }
    }

    condition2() {
        if(this.state.order_condition == true){
            return (
                <div className="card">
                    <div className='App'>
                        <Form>
                            <Form className="align">
                                <h2> Order ID: {this.state.order.orderId} </h2>

                                <Form.Group>
                                    <Form.Label>Name: {this.state.order.customer.firstName + " " + this.state.order.customer.lastName}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email: {this.state.order.customer.email}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contact Number: {this.state.order.customer.number}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Shipping Address: {this.state.order.address} </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City: {this.state.order.city}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>State: {this.state.order.state}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Zip Code: {this.state.order.zipcode}</Form.Label>
                                </Form.Group>
                            </Form>

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity (lb)</th>
                                        <th>Cost</th>
                                        <th>Selling Price</th>
                                        <th>Net Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.order.carts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.goods}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.cost}</td>
                                                <td>{item.selling_price}</td>
                                                <td>{item.revenue}</td>
                                            </tr>)
                                    })}

                                    <tr >
                                        <td>Total:</td>
                                        <td>{this.state.order.total_quantity}</td>
                                        <td>{this.state.order.total_cost}</td>
                                        <td>{this.state.order.total_price}</td>
                                        <td>{this.state.order.total_revenue}</td>
                                    </tr>
                                </tbody>
                            </table>


                            <Form.Row>
                                <Form.Group as={Col} id="delivery_fee">
                                    <Form.Label>Delivery fee: {this.state.order.delivery_fee}</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-2 mr-sm-2">
                                    <Form.Label>Status: {this.state.order.status}
                                    </Form.Label>

                                </Form.Group>

                                <Form.Group as={Col} className="mb-2 mr-sm-2">
                                    <Form.Label>Date: {this.state.order.date}</Form.Label>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group id="total_revenue">
                                <Form.Label>
                                    <h2>Total Profit: {this.state.order.total_revenue - this.state.order.delivery_fee}</h2>
                                </Form.Label>
                            </Form.Group>

                        </Form>
                    </div>
                </div>)
        }
    }

    render() {
        return (
            <div className="container">
                <h4>Search Customers</h4>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={this.handleChange}
                        name="number"
                        placeholder="Contact Number"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.handleClick.bind(this)} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>

                {this.condition()}

                {this.condition2()}
                <div className="middle-block">
                    <h2> All Customers</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Orders</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.customers.map(customer => (

                                <tr key={customer.id}>
                                    <td><NavDropdown title="view orders">
                                        {customer.orders.map(order => {
                                            return <Card name={order.orderId} onClick={() => this.handleClickOrder(order.orderId)}>
                                                <Form inline>
                                                    <Form.Label>
                                                        id: {order.orderId}
                                                    </Form.Label>
                                                    <Form.Label>
                                                        Date: {order.date}
                                                    </Form.Label>
                                                </Form>
                                            </Card>
                                        })}
                                    </NavDropdown></td>

                                    <td>{customer.firstName} {customer.lastName}</td>
                                    <td>{customer.email}</td>

                                    <td>{customer.number}</td>

                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={this.props.deleteCustomers.bind(this, customer.id)}> Delete </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customers: state.customers.customers
})

export default connect(mapStateToProps, { getCustomers, deleteCustomers, getOrders })(Customers)