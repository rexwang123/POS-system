import axios from 'axios';

import {GET_ORDERS, DELETE_ORDERS, ADD_ORDERS, PUT_ORDERS, GET_ONE_ORDER} from './types';

// GET ORDERS
export const getOrders = () => dispatch =>{
    axios.get('/api/orders/')
        .then (res => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE ORDERS
export const deleteOrders = orderId => dispatch =>{
    axios.delete(`/api/orders/${orderId}/`)
        .then (res => {
            dispatch({
                type: DELETE_ORDERS,
                payload: orderId
            });
        }).catch(err => console.log(err));
}

// ADD ORDERS
export const addOrders = order => dispatch =>{
    axios.post('/api/orders/',order)
        .then (res => {
            dispatch({
                type: ADD_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// PUT ORDERS
export const putOrders = order => dispatch =>{
    axios.put(`/api/orders/${order.orderId}/`,order)
        .then (res => {
            dispatch({
                type: PUT_ORDERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// GET ONE ORDERS
export const getOneOrder= orderId => dispatch =>{
    axios.get(`/api/orders/${orderId}`)
        .then (res => {
            dispatch({
                type: GET_ONE_ORDER,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

