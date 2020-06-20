import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';
import { getOrders, deleteOrders, putOrders} from '../actions/orders'
import { getCustomers, deleteCustomers } from '../actions/customers'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl, Card, Modal } from 'react-bootstrap';
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.css'

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
        cus_list_condition: false,
        orderId: "",
        order: "",
        customer_name: ""
    }

    componentDidMount() {
        this.props.getCustomers();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    // When clicks the Search button on the top of the page, this function will be triggered
    // It will get the customer from database and set the condition to be true to render the 
    // customer's details
    handleClick() {
        this.setState(state => ({ ...state, order_condition: false, condition: false }))
        if (this.state.number !== "") {
            axios.get(`/api/customers/${this.state.number}`)
                .then(res => {
                    this.setState(state => ({ ...state, customer: res.data, condition: true, number: "" }))
                })
        }

        document.getElementById('number').value = ""
    }

    handleSearchName() {
        this.setState(state => ({ ...state, order_condition: false, condition: false }))
        const customers = this.props.customers.filter(customer => (customer.firstName + " " + customer.lastName) == this.state.customer_name)
        if (customers.length == 1) {
            axios.get(`/api/customers/${customers[0].number}`)
                .then(res => {
                    this.setState(state => ({ ...state, customer: res.data, condition: true, customer_name: "" }))
                })
        }

        else if (customers.length > 1) {
            alert(`There are more than one customers named ${this.state.customer_name}, please search by contact numbers`)
        }
        document.getElementById('customer_name').value = ""

    }

    handleClickOrder = orderId => {
        this.setState(state => ({ ...state, condition: false, order_condition: false }))
        axios.get(`/api/orders/${orderId}`)
            .then(res => {
                this.setState(state => ({ ...state, order: res.data, order_condition: true }))
            })
    }


    // This function will render the customer details by calling the function in Customer_details.js
    // The condition is used for the conditional rendering
    condition() {
        if (this.state.condition == true) {
            return (
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Sales</th>
                                <th>Date</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customer.orders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.orderId}</td>
                                        <td>{order.status}</td>
                                        <td>{order.total_price}</td>
                                        <td>{order.date}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => { this.handleClickOrder(order.orderId) }}>view details</Button>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    handleCloseCusList() {
        this.setState(state => ({ ...state, cus_list_condition: false }))
    }

    handleCloseOrder() {
        this.setState(state => ({ ...state, order_condition: false }))
    }

    handleClose() {
        this.setState(state => ({ ...state, condition: false }))
    }

    // This function will render the order detail once the user clicks an order, and it enables customers to modify it
    // The condition is used for the conditional rendering
    condition2() {
        if (this.state.order_condition == true) {
            return (
                <div className="card">
                    <div className='App'>
                        <Form>
                            <Form className="align">

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
                                        <Form inline>
                                            <Form.Control name="status" onChange={this.handleChange} as="select">
                                                <option value="Paid">Paid</option>
                                                <option value="Not Paid">Not Paid</option>
                                                <option value="To Be Delivered">To Be Delivered</option>
                                            </Form.Control>
                                            <Button variant="success" onClick={() => {
                                                const new_order = {
                                                    delivery_fee: this.state.order.delivery_fee,
                                                    customer: this.state.order.customer.number,
                                                    date: this.state.order.date,
                                                    status: this.state.status,
                                                    address: this.state.order.address,
                                                    city: this.state.order.city,
                                                    state: this.state.order.state,
                                                    zipcode: this.state.order.zipcode,
                                                    orderId: this.state.order.orderId,
                                                    total_quantity: this.state.order.total_quantity,
                                                    total_cost: this.state.order.total_cost,
                                                    total_price: this.state.order.total_price,
                                                    total_revenue: this.state.order.total_revenue
                                                }
                                                this.setState(state => ({ ...state, order: { ...state.order, status: this.state.status } }))
                                                this.props.putOrders(new_order)
                                            }

                                            }>Save</Button>
                                        </Form>
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
                    <Button variant="danger" onClick={() => {
                        this.props.deleteOrders(this.state.order.orderId);
                        this.props.getCustomers();
                        this.setState(state=>({...state, order_condition:false}))
                    }}>
                            Delete
                    </Button>
                </div>)
        }
    }

    render() {
        return (
            <div className="container">
                <h4>Search Customers</h4>
                <Form>
                    <Form.Row>
                        <InputGroup as={Col} className="mb-3">
                            <FormControl
                                onChange={this.handleChange}
                                name="customer_name"
                                id="customer_name"
                                placeholder="Customer Name (firstName + LastName)"
                            />
                            <InputGroup.Append>
                                <Button onClick={this.handleSearchName.bind(this)} variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        <InputGroup as={Col} className="mb-3">
                            <FormControl
                                onChange={this.handleChange}
                                name="number"
                                id="number"
                                placeholder="Contact Number"
                            />
                            <InputGroup.Append>
                                <Button onClick={this.handleClick.bind(this)} variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Row>
                </Form>



                {/* It calls condition and shows a list of orders of this customer */}
                <Modal size="lg" onHide={this.handleClose.bind(this)} show={this.state.condition}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customer Name: {this.state.customer.firstName + " " + this.state.customer.lastName}</Modal.Title>
                    </Modal.Header>
                    {this.condition()}
                </Modal>


                {/* It calls condition2 and shows the order detail */}
                <Modal size="lg" onHide={this.handleCloseOrder.bind(this)} show={this.state.order_condition}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order ID: {this.state.order.orderId}</Modal.Title>
                    </Modal.Header>
                    {this.condition2()}
                </Modal>

                {/* This is the listing out all customers in the database */}
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
                                                        id: {order.orderId}<br/>
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
                                        <button className="btn btn-danger btn-sm" onClick={this.props.deleteCustomers.bind(this, customer.number)}> Delete </button>
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

export default connect(mapStateToProps, { getCustomers, deleteCustomers, getOrders, deleteOrders, putOrders })(Customers)