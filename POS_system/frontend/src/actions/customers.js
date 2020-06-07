import axios from 'axios';

import {GET_CUSTOMERS, DELETE_CUSTOMERS, ADD_CUSTOMERS, PUT_CUSTOMERS} from './types';

// GET CUSTOMERS
export const getCustomers = () => dispatch =>{
    axios.get('/api/customers/')
        .then (res => {
            dispatch({
                type: GET_CUSTOMERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE CUSTOMERS
export const deleteCustomers = id => dispatch =>{
    axios.delete(`/api/customers/${id}/`)
        .then (res => {
            dispatch({
                type: DELETE_CUSTOMERS,
                payload: id
            });
        }).catch(err => console.log(err));
}

// ADD CUSTOMERS
export const addCustomers = customer => dispatch =>{
    axios.post('/api/customers/',customer)
        .then (res => {
            dispatch({
                type: ADD_CUSTOMERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// PUT CUSTOMERS
export const putCustomers = customer => dispatch =>{
    axios.put(`/api/goods/${customer.id}/`,customer)
        .then (res => {
            dispatch({
                type: PUT_CUSTOMERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}