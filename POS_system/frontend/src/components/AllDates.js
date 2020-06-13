import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGoods } from '../actions/goods'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Axios from "axios";
import Report from './Report'
import Order from "./Order";


export class AllDates extends Component {
    static PropTypes = {
        carts: PropTypes.array.isRequired,
        getGoods: PropTypes.func.isRequired,
        getCartsByDates: PropTypes.func.isRequired
    }

    state = {
        condition:false,
        goodsMap: "",
        customersMap: "",
        total_price:0,
        total_cost:0
    }


    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    
    componentDidMount() {
        //This function makes all required data ready for passing to Report.js to generate a report
        //It set the condition to be true for rendering the report after all data is ready
        this.props.getGoods()
        var goodsMap = new Map()
        var customersMap = new Map()
        Axios.get('/api/orders/')
            .then(res => {
                // Get total cost, sales for this time period
                const total_cost = res.data.reduce((a,c)=>a+parseFloat(c.total_cost),0)
                const total_price = res.data.reduce((a,c)=>a+parseFloat(c.total_price),0)


                // update customer Map where key is in the form of "number,name", 
                // and value is accumulated sales over all orders which belong to the customer
                
                // update the goods Map where key is the goods's name, value is accumulated quantity
                this.props.goods.map(goods => {
                    goodsMap.set(goods.goods, 0)
                })
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
                this.setState(state => ({ ...state, customersMap: customersMap, goodsMap: goodsMap, total_price: total_price, total_cost: total_cost, condition:true }))
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

    render() {
        return (
            <div className="container">
                <div>
                    {this.condition.bind(this)()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    goods: state.goods.goods,
})
export default connect(mapStateToProps, { getGoods})(AllDates)