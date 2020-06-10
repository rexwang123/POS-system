import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getGoods, deleteGoods, addGoods, putGoods } from '../actions/goods'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';


export class Goods extends Component {
    state = {
        goods: "",
        cost: "",
        selling_price: "",
        edit: {
            cost_: "",
            selling_price_: ""
        }
    }

    static propTypes = {
        goods: propTypes.array.isRequired,
        getGoods: propTypes.func.isRequired,
        deleteGoods: propTypes.func.isRequired,
        addGoods: propTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getGoods();
    }

    handleAdd = (e) => {
        e.preventDefault();
        const { goods, cost, selling_price } = this.state;
        const toAdd = { goods, cost, selling_price };
        this.props.addGoods(toAdd);
        document.getElementById("goods").value = "";
        document.getElementById("cost").value = "";
        document.getElementById("selling_price").value = "";
    }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) };

    render() {
        return (
            <div className="container">
                <Fragment>
                    <h2> Goods</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Goods Name</th>
                                <th>Cost</th>
                                <th>Selling Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.goods.map(goods => {

                                return (
                                    <tr key={goods.goods}>
                                        <td>{goods.goods}</td>
                                        <td>
                                            <InputGroup >
                                                <FormControl disabled={true} type="number" name="cost_" id={goods.goods}
                                                    defaultValue={goods.cost} placeholder={goods.cost} />
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <InputGroup >
                                                <FormControl disabled={true} type="number" name="selling_price_" id={goods.goods+"2"}
                                                    defaultValue={goods.selling_price} placeholder={goods.selling_price} />
                                            </InputGroup>
                                        </td>

                                        <td>
                                            <ButtonGroup>
                                                <button type="submit" className="btn btn-primary btn-sm" onClick={() => { document.getElementById(goods.goods).disabled = false,document.getElementById(goods.goods+"2").disabled = false}} > Edit </button>{" "}

                                                <button type="submit" className="btn btn-success btn-sm" 
                                                onClick={() => {
                                                        document.getElementById(goods.goods).disabled = true;
                                                        document.getElementById(goods.goods+"2").disabled = true;
                                                        this.props.putGoods({ "goods": goods.goods, "cost": document.getElementById(goods.goods).value, "selling_price": document.getElementById(goods.goods+"2").value})}}>
                                                         Save </button>{" "}

                                                <button type="submit" className="btn btn-danger btn-sm" onClick={this.props.deleteGoods.bind(this, goods.goods)}> Delete </button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Fragment>
                <Form inline>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="goods"
                        name="goods"
                        placeholder="goods name"
                        onChange={this.handleChange}
                        required />

                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number" name="cost" onChange={this.handleChange} id="cost" placeholder="cost" required />

                    </InputGroup>

                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number" name="selling_price" onChange={this.handleChange} id="selling_price" placeholder="selling price" required />

                    </InputGroup>
                    <ButtonGroup>
                        <Button className="mb-2" onClick={this.handleAdd}>
                            Add
                        </Button>{' '}
                    </ButtonGroup>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    goods: state.goods.goods
})

export default connect(mapStateToProps, { getGoods, deleteGoods, addGoods, putGoods })(Goods)