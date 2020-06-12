import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row } from 'react-bootstrap';

function Customer_details(Props) {
    return (
        <div className='App'>
            <Form>
            <h4>Customer Information</h4>
                <Form className="align">
                
                    <Form.Group>
                        <Form.Label>Name: {Props.customer.firstName + " " + Props.customer.lastName}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email: {Props.customer.email}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Number: {Props.customer.number}</Form.Label>
                    </Form.Group>
                </Form>
                <h4>Orders Information</h4>
                {Props.customer.orders.map(order => {
                    return(
                    <div>
                        <Form className="align">
                            <Form.Group>
                                <Form.Label>Order ID: {order.orderId}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date: {order.date}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status: {order.status}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Shipping Address: {order.address}, {order.city}, {order.state}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Zip Code: {order.zipcode}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Delivery fee: {order.delivery_fee}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Sales: {order.total_price}</Form.Label>
                            </Form.Group>
                        </Form>
                        <hr />
                    </div>
                    )
                })}

            </Form>
        </div>)
}

export default Customer_details;
