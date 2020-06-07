import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Customer_form from './Customer_form'
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import { addCustomers } from '../actions/customers'
import { getGoods, addGoods } from '../actions/goods'

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

        item_name: "",
        quantity: ""
    };

    static PropTypes = {
        addCustomers: propTypes.func.isRequired,
        addGoods: propTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getGoods();
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("submit");
        const { lastName, firstName, email, number, address, city, state, zipcode } = this.state;
        const customer = { lastName, firstName, email, number, address, city, state, zipcode };
        console.log(customer)
        this.props.addCustomers(customer)
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }
    handleAdd = (event) => this.setState(state => {
        event.preventDefault();
        const item = this.state.items.concat({ item_name: state.item_name, quantity: state.quantity })
        const goods = { "goods": "hahah", "cost": "0", "selling_price": "0" }
        console.log(goods)
        this.props.addGoods(goods)
        return {
            ...state,
            items: item
        }
    });


    render() {
        return (
            <div className="container">
                <div className="card">
                    <Customer_form handler={this.handleChange} />
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </div>

                <div>
                    <h2> Cart </h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity (lb)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map(item => (
                                <tr key={item.item_name}>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" > Delete </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Form inline>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control placeholder="item name" name="item_name" onChange={this.handleChange} as="select">
                                <option >Select item</option>))}
                            {this.props.goods.map(goods => (
                                    <option value={goods.goods}>{goods.goods}</option>))}
                            </Form.Control>

                        </InputGroup>
                        <InputGroup className="mb-2 mr-sm-2">
                            <FormControl name="quantity" onChange={this.handleChange} id="inlineFormInputGroupUsername2" placeholder="Quantity in lb" required />
                            <InputGroup.Append>
                                <InputGroup.Text>lb</InputGroup.Text>
                            </InputGroup.Append>

                        </InputGroup>
                        <ButtonGroup>
                            <Button className="mb-2" onClick={this.handleAdd}>
                                Add
                        </Button>{' '}
                        </ButtonGroup>
                    </Form>

                </div>
            </div>)
    }
}

const mapStateToProps = state => ({
    goods: state.goods.goods
})

export default connect(mapStateToProps, { addCustomers, addGoods, getGoods })(Order);

