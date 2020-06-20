import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router'
import './App.css';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Home from './Home'
import Order from './Order'
import Customer from './Customer'
import Goods from './Goods'
import Transactions from './Order_summary'
import AllDates from './AllDates'
import GeneralDates from './GeneralDates'
import { Provider } from 'react-redux'
import store from '../store'
import Statements from './Statements'
import pic from '../assets/images/pos_bg.jpg'


class App extends Component {
   

    render() {
        // It provides the Nav bars and links to all modules on the top the page
        return (
                <div>
                <h1>????????????</h1>
                        {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="#/home">Home</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#/customer">Customers</Nav.Link>
                                    <Nav.Link href="#/transactions">Order Summary</Nav.Link>
                                    <Nav.Link href="#/goods">Goods</Nav.Link>
                                    <Nav.Link href="#/statements">Statements</Nav.Link>

                                    <NavDropdown title="Reports" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#/report/selected_dates">Selected Dates</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#/report/all">All</NavDropdown.Item>
                             
                                    </NavDropdown>
                                </Nav>
                                <Nav>
                                <Nav.Link href="#/order">New Order</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <Router>
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/order" component={Order} />
                            <Route exact path="/customer" component={Customer} />
                            <Route exact path="/goods" component={Goods} />
                            <Route exact path="/transactions" component={Transactions} />
                            <Route exact path="/report/all" component={AllDates} />
                            <Route exact path="/report/selected_dates" component={GeneralDates} />
                            <Route exact path="/statements" component={Statements} />
                    </Router> */}
                    <img src={pic}/>
                </div>
        );
    }
}

export default App;

