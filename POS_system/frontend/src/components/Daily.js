import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGoods } from '../actions/goods'
import { getCartsByDates } from '../actions/carts'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Axios from "axios";
import Report from './Report'


export class Daily extends Component {
    static PropTypes = {
        carts: PropTypes.array.isRequired,
        getGoods: PropTypes.func.isRequired,
        getCartsByDates: PropTypes.func.isRequired
    }

    state = {
        date: "",
        map: "",
        condition: false
    }

    componentDidMount() {
        this.props.getGoods();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClick() {

        Axios.get('/api/carts/by_dates', { params: { start_date: this.state.date, end_date: this.state.date } })
            .then(res => {
                
                var goodsMap = new Map()
                this.props.goods.map(goods => {
                    goodsMap.set(goods.goods, 0)
                })
                res.data.map(cart => {
                    goodsMap.set(cart.goods, goodsMap.get(cart.goods) + parseFloat(cart.quantity))
                }
                )
                console.log(goodsMap)
                this.setState( state =>({...state, map:goodsMap, condition:true}))
            })

    }

    condition(){
        if(this.state.condition === true){
            return (
                <div className="card">
                    <Report map={this.state.map} goods={this.props.goods}/>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <Form.Control name="date" type="date" onChange={this.handleChange} />
                    <InputGroup.Append>
                        <Button onClick={this.handleClick.bind(this)} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
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

export default connect(mapStateToProps, { getGoods, getCartsByDates })(Daily)