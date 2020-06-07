import axios from 'axios';

import {GET_CARTS, DELETE_CARTS, ADD_CARTS, PUT_CARTS} from './types';

// GET CARTS
export const getCarts = () => dispatch =>{
    axios.get('/api/carts/')
        .then (res => {
            dispatch({
                type: GET_CARTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE CARTS
export const deleteCarts = cart => dispatch =>{
    axios.delete(`/api/carts/${cart}/`)
        .then (res => {
            dispatch({
                type: DELETE_CARTS,
                payload: carts
            });
        }).catch(err => console.log(err));
}

// ADD CARTS
export const addCarts = cart => dispatch =>{
    axios.post('/api/carts/',cart)
        .then (res => {
            dispatch({
                type: ADD_CARTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// PUT CARTS
export const putCarts = cart => dispatch =>{
    axios.put(`/api/carts/${cart.id}/`,cart)
        .then (res => {
            dispatch({
                type: PUT_CARTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}