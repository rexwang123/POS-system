import React, { Component, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getOneOrder, deleteOrders} from '../actions/orders'
import Order_form from './Order_form'


class Transactions extends Component {
    state= {
        orderId: "",
        condition:false,
        order:""
    }

    static PropTypes = {
        order: PropTypes.object.isRequired,
        getOneOrder: PropTypes.func.isRequired,
        deleteOrders: PropTypes.func.isRequired
    }

    // componentDidMount(){
    //     this.props.getOneOrder(this.state.orderId);
    // }

    handleChange = e => {this.setState({[e.target.name]:e.target.value})}
    
    handleClick = ()=>{
        console.log("really")
        axios.get( `/api/orders/${this.state.orderId}`)
        .then(res => 
            this.setState(state => 
                {
                    return {
                        ...state,
                        condition:true, 
                        order:res.data}
                })
        ).catch(err =>
            alert("The order ID is not found"))       
        
    }

   
    condition() {
        if(this.state.condition === true){
            console.log(this.state.order)
            return (
                <div className="card">
                    <Order_form order={this.state.order}/>
                </div>)
        }
            
    }

    render() {
        return (
            <div className="container">
            <h1>Search order sumary</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange = {this.handleChange}
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

export default connect(mapStateToProps,{getOneOrder})(Transactions)
