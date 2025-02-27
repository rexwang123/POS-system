import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGoods } from '../actions/goods'
import { getCartsByDates } from '../actions/carts'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Axios from "axios";
import Report from './Report'
import Order from "./Order";

// This class is used for generating reports for periods of time by selecting start date and end date
export class GeneralDates extends Component {
    static PropTypes = {
        carts: PropTypes.array.isRequired,
        getGoods: PropTypes.func.isRequired,
        getCartsByDates: PropTypes.func.isRequired
    }

    state = {
        start_date: "",
        end_date: "",
        goodsMap: "",
        customersMap: "",
        condition: false,
        total_cost: 0,
        total_price: 0
    }

    componentDidMount() {
        this.props.getGoods();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    // This function is triggered when clicked on the Search button
    // It makes a GET Http request to retrieve all orders between the selected time period
    // It then makes two Map, for customers and products, as preparations for finding K top customer/products 
    handleClick() {
        this.setState(state => ({ ...state, condition: false }))
        var goodsMap = new Map()
        var customersMap = new Map()
        Axios.get('/api/orders/by_dates', { params: { start_date: this.state.start_date, end_date: this.state.end_date } })
            .then(res => {

                // Get total cost, sales for this time period
                const total_cost = res.data.reduce((a,c)=>a+parseFloat(c.total_cost),0)
                const total_price = res.data.reduce((a,c)=>a+parseFloat(c.total_price),0)

                this.props.goods.map(goods => {
                    goodsMap.set(goods.goods, 0)
                })

                
                // update customer Map where key is in the form of "number,name", 
                // and value is accumulated sales over all orders which belong to the customer
                
                // update the goods Map where key is the goods's name, value is accumulated quantity
                res.data.map(order => {
                    const key = order.customer.number+","+order.customer.firstName + " "+order.customer.lastName;
                    if (customersMap.has(key)) {
                        customersMap.set(key, customersMap.get(key) + parseFloat(order.total_price))
                    }
                    else {
                        customersMap.set(key, parseFloat(order.total_price))
                    }

                    order.carts.map(cart => {
                        goodsMap.set(cart.goods, goodsMap.get(cart.goods) + parseFloat(cart.quantity))
                    })
                }
                )
                this.setState(state => ({ ...state, customersMap: customersMap, goodsMap: goodsMap, condition: true, total_price: total_price, total_cost: total_cost }))
            })


    }

    // It's a conditional rendering function for rendering the report after the user clicks "Generate Report" 
    condition() {
        if (this.state.condition === true) {
            return (
                <div>
                    <Report customersMap={this.state.customersMap}
                        goodsMap={this.state.goodsMap}
                        goods={this.props.goods}
                        total_sales={this.state.total_price}
                        total_cost={this.state.total_cost} />
                </div>
            )
        }
    }

    // It displays two input fields for users to pick start date and end date
    // It will then generate the report after selecting start date and end date
    render() {
        return (
            <div className="container">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="start_date" placeholder="start_date" onChange={this.handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="end_date" placeholder="end_date" onChange={this.handleChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" onClick={this.handleClick.bind(this)}> Generate Report </Button>
                </Form>
                <div>
                    {this.condition.bind(this)()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    goods: state.goods.goods,
    carts_by_dates: state.carts.carts_by_dates
})

export default connect(mapStateToProps, { getGoods, getCartsByDates })(GeneralDates)