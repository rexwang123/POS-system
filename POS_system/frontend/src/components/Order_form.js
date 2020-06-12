import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row } from 'react-bootstrap';

function Order_form(Props) {
    return (
        <div className='App'>
            <Form>
                <Form className="align">
                    <h2> Order ID: {Props.order.orderId} </h2>

                    <Form.Group>
                        <Form.Label>Name: {Props.order.customer.firstName + " " + Props.order.customer.lastName}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email: {Props.order.customer.email}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Number: {Props.order.customer.number}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Shipping Address: {Props.order.address} </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City: {Props.order.city}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State: {Props.order.state}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zip Code: {Props.order.zipcode}</Form.Label>
                    </Form.Group>
                </Form>

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
                        {Props.order.carts.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.goods}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.cost}</td>
                                    <td>{item.selling_price}</td>
                                    <td>{item.revenue}</td>
                                </tr>)
                        })}

                        <tr >
                            <td>Total:</td>
                            <td>{Props.order.total_quantity}</td>
                            <td>{Props.order.total_cost}</td>
                            <td>{Props.order.total_price}</td>
                            <td>{Props.order.total_revenue}</td>
                        </tr>
                    </tbody>
                </table>


                <Form.Row>
                    <Form.Group as={Col} id="delivery_fee">
                        <Form.Label>Delivery fee: {Props.order.delivery_fee}</Form.Label>
                    </Form.Group>


                    <Form.Group as={Col} className="mb-2 mr-sm-2">
                        <Form.Label>Status: {Props.order.status}</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-2 mr-sm-2">
                        <Form.Label>Date: {Props.order.date}</Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Group id="total_revenue">
                    <Form.Label>
                        <h2>Total Profit: {Props.order.total_revenue - Props.order.delivery_fee}</h2>
                    </Form.Label>
                </Form.Group>

            </Form>
        </div>)
}

export default Order_form;
