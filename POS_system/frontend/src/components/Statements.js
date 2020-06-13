import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getGoods } from '../actions/goods'
import { getSections, deleteSections, addSections, putSections } from '../actions/sections'
import { getEntries, deleteEntries, addEntries, putEntries } from '../actions/entries'
import { Button, ButtonGroup, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import './App.css'

// This class is used for adding sections and entries of each created sections 
export class Statements extends Component {
    state = {
        section: "",
        entry: ""
    }

    static propTypes = {
        sections: propTypes.array.isRequired,
        getSections: propTypes.func.isRequired,
        putEntries: propTypes.func.isRequired,
        deleteEntries: propTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getSections();
        this.props.getEntries();
    }

    // This function adds new sections with name input from the users
    handleAddSection = (e) => {
        e.preventDefault();
        const { section } = this.state;
        const toAdd = { section: section };
        this.props.addSections(toAdd);
        document.getElementById("section").value = "";
    }

    // This function adds new entries with content input from the users
    handleAddEntry = id => {
        const { entry } = this.state;
        const toAdd = { entry: entry, section: id };
        this.props.addEntries(toAdd);
        this.props.getSections();
        document.getElementById("entry").value = "";

    }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) };

    render() {
        return (
            <div className="container">
                <Fragment>

                    {/* It lists out all sections, with entries inside */}
                    {this.props.sections.map((section, index) => {
                        const entries = this.props.entries.filter(x => x.section == section.id);
                        return (
                            <div className="block">

                                <h2>{section.section}</h2>

                                {/* It lists out all entries in this section, and enable the edit/save/delete for each entry
                                It traces the value of the entry by making unique id in this document in the format of "#section,#entry" */}
                                {entries.map((entry, index2) => {
                                    return (
                                        <div>
                                            <InputGroup >
                                                <FormControl disabled={true} type="text" id={index + "," + index2}
                                                    defaultValue={entry.entry} placeholder={entry.entry} />

                                                <InputGroup.Append>
                                                    <ButtonGroup>
                                                        <button type="submit" className="btn btn-primary btn-sm" onClick={() => { document.getElementById(index + "," + index2).disabled = false }} > Edit </button>{" "}

                                                        <button type="submit" className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                console.log(document.getElementById(index + "," + index2).value);
                                                                document.getElementById(index + "," + index2).disabled = true;
                                                                this.props.putEntries({ id: entry.id, section: section.id, entry: document.getElementById(index + "," + index2).value })
                                                            }}>
                                                            Save </button>{" "}

                                                        <button type="submit" className="btn btn-danger btn-sm" onClick={() => {
                                                            this.props.deleteEntries(entry.id)}}>
                                                            Delete </button>
                                                    </ButtonGroup>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>
                                    )
                                })}
                                <Form inline>
                                    <Form.Control
                                        className="mb-2 mr-sm-2"
                                        id="entry"
                                        name="entry"
                                        placeholder="entry description"
                                        onChange={this.handleChange}
                                        required />

                                    <ButtonGroup>
                                        <Button className="mb-2" onClick={this.handleAddEntry.bind(this, section.id)}>
                                            Add New Entry
                                    </Button>{' '}
                                    </ButtonGroup>
                                </Form>
                                <div className="App">
                                <Button variant ="danger"  onClick={() => {this.props.deleteSections(section.id)}}>Delete</Button>
                                </div>
                                <hr />
                            </div>
                        )

                    })}

                    <Form inline>
                        <Form.Control
                            className="mb-2 mr-sm-2"
                            id="section"
                            name="section"
                            placeholder="section description"
                            onChange={this.handleChange}
                            required />

                        <ButtonGroup>
                            <Button variant="success" className="mb-2" onClick={this.handleAddSection}>
                                Add New Section
                        </Button>{' '}
                        </ButtonGroup>
                    </Form>

                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sections: state.sections.sections,
    entries: state.entries.entries
})

export default connect(mapStateToProps, { putEntries, putSections, deleteEntries, getEntries, deleteSections, getSections, addSections, addEntries })(Statements)