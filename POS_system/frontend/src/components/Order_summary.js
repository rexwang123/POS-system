import React, { Component, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getOneOrder, deleteOrders, putOrders } from '../actions/orders'


class Transactions extends Component {
    state = {
        orderId: "",
        condition: false,
        order: "",
        status: "Paid"
    }

    static PropTypes = {
        order: PropTypes.object.isRequired,
        getOneOrder: PropTypes.func.isRequired,
        deleteOrders: PropTypes.func.isRequired,
        putOrders: PropTypes.func.isRequired
    }

    // componentDidMount(){
    //     this.props.getOneOrder(this.state.orderId);
    // }

    handleChange = e => { this.setState({ [e.target.name]: e.target.value }) }

    handleClick = () => {
        if(this.state.orderId === ""){
            return
        }
        axios.get(`/api/orders/${this.state.orderId}`)
            .then(res =>
                this.setState(state => {
                    return {
                        ...state,
                        condition: true,
                        order: res.data
                    }
                })
            ).catch(err =>
                alert("The order ID is not found"))

    }

    handleDelete = () =>{
        this.props.deleteOrders(this.state.orderId)
        this.setState(state=>({...state, condition:false}))
    }


    // This is the condition rendering fucntion. Once the order ID is given, and the 
    // Search button is clicked, it will display an order's detail information, and provides the 
    // functionality to update the status of the order, and delete the order
    condition() {
        if (this.state.condition === true) {
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



                            {/* The table shows the details of purchased items */}
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


                            
                            {/* The following part shows the delivery fee, status and date
                            The Status is able to be changed */}
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
                                            <Button variant="success" onClick={() =>{
                                                const new_order = {
                                                    delivery_fee:this.state.order.delivery_fee, 
                                                    customer: this.state.order.customer.number, 
                                                    date:this.state.order.date, 
                                                    status:this.state.status, 
                                                    address:this.state.order.address, 
                                                    city:this.state.order.city, 
                                                    state:this.state.order.state,
                                                    zipcode:this.state.order.zipcode, 
                                                    orderId: this.state.order.orderId,
                                                    total_quantity: this.state.order.total_quantity,
                                                    total_cost:this.state.order.total_cost,
                                                    total_price:this.state.order.total_price,
                                                    total_revenue:this.state.order.total_revenue
                                            }
                                                this.setState(state=>({...state, order:{...state.order, status:this.state.status}}))
                                                this.props.putOrders(new_order)}

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
                    <Button variant="danger" onClick={this.handleDelete}>
                    Delete
                    </Button>
                </div>)
        }

    }

    render() {
        return (
            <div className="container">
                <h1>Search orders</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={this.handleChange}
                        name="orderId"
                        placeholder="Order ID"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.handleClick} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>

                <div className="card">
                    {this.condition()}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    order: state.orders.order
})

export default connect(mapStateToProps, { getOneOrder, putOrders, deleteOrders })(Transactions)
