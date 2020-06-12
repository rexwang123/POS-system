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
        console.log("?")
        this.props.getGoods()
        // Axios.get('/api/goods/')
        // .then(res_goods => Axios.get('/api/orders/')
        //     .then(res => {
        //         var goodsMap = new Map()
        //         var customersMap = new Map()

        //         var total_cost = 0
        //         var total_price = 0

        //         res_goods.data.map(goods => {
        //             goodsMap.set(goods.goods, 0)
        //         })
        //         res.data.map(order => {
        //             if (customersMap.has(order.customer.number)) {
        //                 customersMap.set(order.customer.number, customersMap.get(order.customer.number) + parseFloat(order.total_price))
        //             }
        //             else {
        //                 customersMap.set(order.customer.number, order.total_price)
        //             }
        //             order.carts.map(cart => {
        //                 goodsMap.set(cart.goods, goodsMap.get(cart.goods) + parseFloat(cart.quantity))
        //             })

        //             total_cost += order.total_cost
        //             total_price += order.total_price
        //         }
        //         )

        //         this.setState(state => ({ ...state, customersMap: customersMap, goodsMap: goodsMap, total_price: total_price, total_cost: total_cost, condition:true }))
        //     })
        // )
        var goodsMap = new Map()
        var customersMap = new Map()
        Axios.get('/api/orders/')
            .then(res => {
                const total_cost = res.data.reduce((a,c)=>a+parseFloat(c.total_cost),0)
                const total_price = res.data.reduce((a,c)=>a+parseFloat(c.total_price),0)

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
                // console.log(customersMap)
                this.setState(state => ({ ...state, customersMap: customersMap, goodsMap: goodsMap, total_price: total_price, total_cost: total_cost, condition:true }))
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