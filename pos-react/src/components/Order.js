import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Customer_info from './customer_info'


function Order() {
    const [user_info, setInfo] = useState({
        firstName:"",
        lastName:"",
        email:"",
        number:"",
        address:"",
        city:"",
        state:"",
        zipcode:""
    });
    
    function handleSubmit() {
        
    }

    function handleClick(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
        console.log(value);
    }
    return (
        <div>
            <Customer_info handler={handleClick} />
        </div>)
}

export default Order;

