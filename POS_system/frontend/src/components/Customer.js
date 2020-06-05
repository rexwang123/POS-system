import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCustomers, deleteCustomers} from '../actions/customers'

export class Customers extends Component{
    static propTypes = {
        customers: PropTypes.array.isRequired,
        getCustomers: PropTypes.func.isRequired,
        deleteCustomers: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getCustomers();
    }

    render(){
        return(
            <Fragment>
                <h2> Customers</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
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
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    customers: state.customersReducer.customers
})

export default connect(mapStateToProps, {getCustomers,deleteCustomers})(Customers)