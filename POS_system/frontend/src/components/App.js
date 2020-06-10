import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router'
import './App.css';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Order from './Order'
import Customer from './Customer'
import Goods from './Goods'
import Transactions from './Transactions'
import Daily from './Daily'
import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="#home">Menu</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#/customer">Customers</Nav.Link>
                                    <Nav.Link href="#/order">Order</Nav.Link>
                                    <Nav.Link href="#/goods">Goods</Nav.Link>
                                    <Nav.Link href="#/transactions">Order Summary</Nav.Link>

                                    <NavDropdown title="Reports" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#/report/daily">Daily</NavDropdown.Item>
                                        <NavDropdown.Item href="#/report/weekly">Weekly</NavDropdown.Item>
                                        <NavDropdown.Item href="#/report/monthly">Monthly</NavDropdown.Item>
                             
                                    </NavDropdown>
                                </Nav>
                                <Nav>
                                    <Nav.Link href="#deets">More deets</Nav.Link>
                                    <Nav.Link eventKey={2} href="#memes">
                                        Dank memes
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <Router>
                            <Route exact path="/order" component={Order} />
                            <Route exact path="/customer" component={Customer} />
                            <Route exact path="/goods" component={Goods} />
                            <Route exact path="/transactions" component={Transactions} />
                            <Route exact path="/report/daily" component={Daily} />
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;

