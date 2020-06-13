import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import Axios from 'axios';

// This is the function for generating the reports, including total sales, top producs/customers
// And the records of products quantity being purchased
function Report(Props) {
    const [topGoods, setTopGoods] = useState([])
    const [topCustomers, setTopCustomers] = useState([])
    const [k, setK] = useState(0)
    
    // It calculates the top K products from the customer map passed from AllDates.js or GeneralDates.js
    function calculateTopGoods(e) {
        var goodsArray = []
        Props.goodsMap.forEach((value, key) => {
            goodsArray.push({ goods: key, quantity: value })
        })
        goodsArray.sort((a, b) => b.quantity - a.quantity)
        goodsArray = goodsArray.slice(0, e.target.value)
        setTopGoods(goodsArray)
    }

    // It calculates the top K customers from the customer map passed from AllDates.js or GeneralDates.js
    function calculateTopCustomers(e) {
        var customersArray = []
        Props.customersMap.forEach((value, key) => {
            customersArray.push({ number: key.split(",")[0], name: key.split(",")[1], sales:value })

        })
        customersArray.sort((a, b) => b.sales - a.sales)
        customersArray = customersArray.slice(0, e.target.value)
        setTopCustomers(customersArray)
    }

    
    return (
        <div className='App'>
            <h2>Sales Summary</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Total Cost</th>
                        <th>Total Sales</th>
                        <th>Net Profit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{parseFloat(Props.total_cost).toFixed(2)}</td>
                        <td>{parseFloat(Props.total_sales).toFixed(2)}</td>
                        <td>{(parseFloat(Props.total_sales) - parseFloat(Props.total_cost)).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
<div className="middle-block">
            <h2> Top Goods </h2>
            <Form.Group className="mb-2">
                <Form.Label>Select top K goods <Form.Control placeholder="Top k goods" name="k" onChange={calculateTopGoods} as="select" required>
                    <option value="0">Select K</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </Form.Control></Form.Label>

            </Form.Group>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Goods Name</th>
                        <th>Quantity (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {topGoods.map((goods, index) => {
                        return (
                            <tr key={index}>
                                <td>{goods.goods}</td>
                                <td>{goods.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            <div className="middle-block">
                <h2> Top Customers </h2>
                <Form.Group className="mb-2">
                    <Form.Label>Select top K customers <Form.Control placeholder="Top k customers" name="k" onChange={calculateTopCustomers} as="select" required>
                        <option value="0">Select K</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Form.Control></Form.Label>
                </Form.Group>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Number</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCustomers.map((customer, index) => {
                            return (
                                <tr key={index}>
                                    <td>{customer.name}</td>
                                    <td>{customer.number}</td>
                                    <td>{parseFloat(customer.sales).toFixed(2)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="middle-block">
                <h2> All Goods</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Goods Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Props.goods.map(goods => {
                            return (
                                <tr key={goods.goods}>
                                    <td>{goods.goods}</td>
                                    <td>{Props.goodsMap.get(goods.goods)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>)
}

export default Report;
