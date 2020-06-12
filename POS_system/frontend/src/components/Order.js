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

class Order extends Component {
    state = {
        lastName: "",
        firstName: "",
        email: "",
        number: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        items: [],

        date: "",
        item_name: "",
        quantity: "",
        item_cost: "",
        item_price: "",
        delivery_fee: 0,
        status: "Paid",
        orderId: "",
        total_quantity: 0,
        total_cost: 0,
        total_price: 0,
        total_revenue: 0,
    };

    static PropTypes = {
        addCustomers: PropTypes.func.isRequired,
        addGoods: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getGoods();
    }


    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        if (this.state.firstName === "" || this.state.lastName === "" || this.state.email === ""
            || this.state.number === "" || this.state.address === "" || this.state.city === ""
            || this.state.state === "" || this.state.zipcode === "" || this.state.date === "") {
            alert("You missed one or more fields")
            return
        }
        if (this.state.items.length > 0) {
            const { lastName, firstName, email, number, address, city, state, zipcode, status, date, delivery_fee, total_quantity,
                total_cost,
                total_price,
                total_revenue } = this.state;
            // add customer to sqlite database
            const customer = { lastName, firstName, email, number };
            // this.props.addCustomers(customer)

            const orderId = this.state.number + "" + Math.floor(100000 + Math.random() * 900000);
            const order = {
                delivery_fee, customer: parseInt(number), date, status, address, city, state, zipcode, orderId: orderId,
                total_quantity,
                total_cost,
                total_price,
                total_revenue
            };

            axios.post('/api/customers/', customer)
                .then(res => {
                    console.log(order.customer)
                    axios.post('api/orders/', order)
                        .then(res => this.state.items.map(item => {
                            this.props.addCarts({ goods: item.item_name, quantity: item.quantity, cost: item.cost, selling_price: item.selling_price, revenue: item.revenue, order: orderId, date: this.state.date })
                        }))
                })
                .catch(res => {
                    axios.put(`/api/customers/${customer.number}/`, customer)
                        .then(res => {
                            console.log(order.customer)
                            axios.post('api/orders/', order)
                                .then(res => this.state.items.map(item => {
                                    this.props.addCarts({ goods: item.item_name, quantity: item.quantity, cost: item.cost, selling_price: item.selling_price, revenue: item.revenue, order: orderId, date: this.state.date })
                                }))
                        })

                })
                // this.setState({
                //     lastName: "",
                //     firstName: "",
                //     email: "",
                //     number: "",
                //     address: "",
                //     city: "",
                //     state: "",
                //     zipcode: "",
                //     items: [],
    
                //     date: "",
                //     item_name: "",
                //     quantity: "",
                //     item_cost: "",
                //     item_price: "",
                //     delivery_fee: 0,
                //     status: "Paid",
                //     orderId: "",
                //     total_quantity: 0,
                //     total_cost: 0,
                //     total_price: 0,
                //     total_revenue: 0,
                // })
    
                // document.getElementById("lastName").value = ""
                // document.getElementById("firstName").value = ""
                // document.getElementById("number").value = ""
                // document.getElementById("email").value = ""
                // document.getElementById("address").value = ""
                // document.getElementById("city").value = ""
                // document.getElementById("state").value = ""
                // document.getElementById("zipcode").value = ""

            
        }
    }


    handleSelect = event => {
        const value = event.target.value;
        if (value === "Select item") {
            return;
        }
        const goods = this.props.goods.find(item => item.goods == value);
        this.setState(state => {
            return { ...state, item_name: value, item_cost: goods.cost, item_price: goods.selling_price };
        })
    }


    handleAdd = (event) => this.setState(state => {
        if (state.item_name === "" || state.item_name === "Select item" || state.quantity === "")
            return
        const one = this.state.items.find(item => state.item_name == item.item_name)
        const price = state.item_price * state.quantity
        const cost = state.item_cost * state.quantity
        var newItems = ""
        if (one == null) {
            newItems = state.items.concat({ item_name: state.item_name, quantity: state.quantity, cost: cost, selling_price: price, revenue: price - cost })
        }
        else {
            const rest = state.items.filter(item => state.item_name != item.item_name)
            const q = parseFloat(one.quantity) + parseFloat(state.quantity)
            const c = parseFloat(one.cost) + parseFloat(cost)
            const p = parseFloat(one.selling_price) + parseFloat(price)
            newItems = rest.concat({ item_name: state.item_name, quantity: q, cost: c, selling_price: p, revenue: p - c })
        }

        return {
            ...state,
            items: newItems,
            total_quantity: parseFloat(state.total_quantity) + parseFloat(state.quantity),
            total_cost: parseFloat(state.total_cost) + parseFloat(cost),
            total_price: parseFloat(state.total_price) + parseFloat(price),
            total_revenue: parseFloat(state.total_revenue) + parseFloat(price - cost)
        }
    });


    handleDelete = event => {
        const name = event.target.name;
        const i = this.state.items.find(item => item.item_name == name)
        this.setState(state => {
            return {
                ...state,
                items: state.items.filter(item => item.item_name != name),
                total_quantity: parseFloat(state.total_quantity) - parseFloat(i.quantity),
                total_cost: parseFloat(state.total_cost) - parseFloat(i.cost),
                total_price: parseFloat(state.total_price) - parseFloat(i.selling_price),
                total_revenue: parseFloat(state.total_revenue) - parseFloat(i.revenue)
            }
        })
    };



    render() {
        return (
            <div className="container">
                <div className="block" >
                    <div className="card">
                        <Form className="App">
                            <h1> Customer Information</h1>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control id="firstName" type="text" name="firstName" placeholder="First name" onChange={this.handleChange} required />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control id="lastName" type="text" name="lastName" placeholder="Last name" onChange={this.handleChange} required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control id="email" type="email" name="email" placeholder="Enter email" onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control id="number" type="number" name="number" placeholder="Enter number" onChange={this.handleChange} required />
                                </Form.Group>


                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control id="address" name="address" placeholder="1234 Main St, Apartment" onChange={this.handleChange} required />
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control id="city" name="city" onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control id="state" name="state" onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control id="zipcode" type="number" name="zipcode" onChange={this.handleChange} required />
                                </Form.Group>
                            </Form.Row>

                        </Form>

                    </div>
                </div>
                <div className="middle-block" >
                    <h1> Cart </h1>
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
                            {this.state.items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.item_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.selling_price}</td>
                                        <td>{item.revenue}</td>
                                        <td>
                                            <button onClick={this.handleDelete} name={item.item_name} className="btn btn-danger btn-sm" > Delete </button>
                                        </td>
                                    </tr>)
                            })}

                            <tr >
                                <td>Total:</td>
                                <td>{this.state.total_quantity}</td>
                                <td>{this.state.total_cost}</td>
                                <td>{this.state.total_price}</td>
                                <td>{this.state.total_revenue}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Form inline>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control placeholder="item name" name="item_name" onChange={this.handleSelect} as="select" required>
                                <option>Select item</option>))}
                            {this.props.goods.map(goods => (
                                    <option value={goods.goods}>{goods.goods}</option>))}
                            </Form.Control>

                        </InputGroup>
                        <InputGroup className="mb-2 mr-sm-2">
                            <FormControl type="number" name="quantity" onChange={this.handleChange} id="inlineFormInputGroupUsername2" placeholder="Quantity in lb" required />
                            <InputGroup.Append>
                                <InputGroup.Text>lb</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        <Button className="mb-2" onClick={this.handleAdd}>
                            Add
                        </Button>{' '}

                    </Form>

                </div>
                <hr />
                <div>
                    <Form>
                        <Form.Group id="delivery_fee">
                            <Form.Label>Delivery fee:</Form.Label>
                            <Form.Control name="delivery_fee" onChange={this.handleChange} type="number" placeholder="0.00" />
                        </Form.Group>


                        <Form.Group className="mb-2 mr-sm-2">
                            <Form.Label>Status:</Form.Label>
                            <Form.Control name="status" onChange={this.handleChange} as="select" required>
                                <option value="Paid">Paid</option>
                                <option value="Not Paid">Not Paid</option>
                                <option value="To Be Delivered">To Be Delivered</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-2 mr-sm-2">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control name="date" onChange={this.handleChange} type="date" required />
                        </Form.Group>

                        <Form.Group id="total_profit">
                            <Form.Label>
                                <h2>Total Profit: {this.state.total_revenue - this.state.delivery_fee}</h2>
                            </Form.Label>

                        </Form.Group>
                    </Form>
                </div>
                <hr />
                <div className="card">
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>

                </div>
            </div>)
    }
}

const mapStateToProps = state => ({
    goods: state.goods.goods
})

export default connect(mapStateToProps, { addCustomers, addGoods, getGoods, addOrders, addCarts })(Order);