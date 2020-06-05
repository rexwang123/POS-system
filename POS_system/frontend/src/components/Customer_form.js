import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row } from 'react-bootstrap';

function Customer_form(Props){
    return(
        <div className='App'>
            <Form>
            <h1> Customer Information</h1>
                <Form.Row>
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type = "text" name="firstName" placeholder="First name" onChange={Props.handler} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type = "text" name="lastName" placeholder="Last name" onChange={Props.handler} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={Props.handler} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="number" name="number" placeholder="Enter number" onChange={Props.handler} required/>
                    </Form.Group>


                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" placeholder="1234 Main St, Apartment" onChange={Props.handler} required/>
                    </Form.Group>

                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control name="city" onChange={Props.handler} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control name="state" onChange={Props.handler} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="number" name="zipcode" onChange={Props.handler} required/>
                    </Form.Group>
                </Form.Row>

               

                
            </Form>
        </div>)
}

export default Customer_form;
