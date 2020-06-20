import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router'
import './components/App.css';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home'
import Order from './components/Order'
import Customer from './components/Customer'
import Goods from './components/Goods'
import Transactions from './components/Order_summary'
import AllDates from './components/AllDates'
import GeneralDates from './components/GeneralDates'
import { Provider } from 'react-redux'
import store from './store'
import Statements from './components/Statements'

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
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
      <Route exact path="/" component={Home} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/customer" component={Customer} />
      <Route exact path="/goods" component={Goods} />
      <Route exact path="/transactions" component={Transactions} />
      <Route exact path="/report/all" component={AllDates} />
      <Route exact path="/report/selected_dates" component={GeneralDates} />
      <Route exact path="/statements" component={Statements} />
    </Router>
    </Provider>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
