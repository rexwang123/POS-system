import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGoods } from '../actions/goods'
import { getCartsByDates } from '../actions/carts'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Axios from "axios";
import Report from './Report'
import Order from "./Order";


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

    handleClick() {

        Axios.get('/api/orders/by_dates', { params: { start_date: this.state.start_date, end_date: this.state.end_date } })
            .then(res => {

                var goodsMap = new Map()
                var customersMap = new Map()

                var total_cost = 0
                var total_price = 0

                this.props.goods.map(goods => {
                    goodsMap.set(goods.goods, 0)
                })
                res.data.map(order => {
                    if (customersMap.has(order.customer.number)) {
                        customersMap.set(order.customer.number, customersMap.get(order.customer.number) + parseFloat(order.total_price))
                    }
                    else {
                        customersMap.set(order.customer.number, order.total_price)
                    }
                    order.carts.map(cart => {
                        goodsMap.set(cart.goods, goodsMap.get(cart.goods) + parseFloat(cart.quantity))
                    })
                    total_cost += order.total_cost
                    total_price += order.total_price
                }
                )

                this.setState(state => ({ ...state, customersMap: customersMap, goodsMap: goodsMap, condition: true, total_price: total_price, total_cost: total_cost }))
            })


    }

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