import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';
import {getCustomers, deleteCustomers} from '../actions/customers'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Customer_details from './Customer_details'

export class Customers extends Component{
    static propTypes = {
        customers: propTypes.array.isRequired,
        getCustomers: propTypes.func.isRequired,
        deleteCustomers: propTypes.func.isRequired
    }

    state = {
        number: "",
        customer: "",
        condition: false
    }

    componentDidMount(){
        this.props.getCustomers();
    }

    handleChange = e => this.setState({[e.target.name]:e.target.value})

    handleClick(){
        axios.get(`/api/customers/${this.state.number}`)
        .then(res => {
            this.setState(state => ({...state, customer:res.data, condition: true}))
        })
    }

    condition(){
        if(this.state.condition == true){
            return (
                <div className="card">
                    <Customer_details customer={this.state.customer}/>
                </div>
            )
        }
    }

    render(){
        return(
            <div className="container">
                <h4>Search Customers</h4>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={this.handleChange}
                        name="number"
                        placeholder="Contact Number"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.handleClick.bind(this)} variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>

                {this.condition()}

                <div className="middle-block">
                <h2> All Customers</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.firstName} {customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.number}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick = {this.props.deleteCustomers.bind(this, customer.id)}> Delete </button>
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

export default connect(mapStateToProps, {getCustomers,deleteCustomers})(Customers)