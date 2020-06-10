import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import { Button, Form, Col, Row } from 'react-bootstrap';

function Report(Props) {
    
    return (
        <div className='App'>

                <h2> Goods</h2>
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
                                    <td>{Props.map.get(goods.goods)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
   
        </div>)
}

export default Report;
