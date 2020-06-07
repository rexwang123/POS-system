import axios from 'axios';

import {GET_GOODS, DELETE_GOODS, ADD_GOODS, PUT_GOODS} from './types';

// GET GOODS
export const getGoods = () => dispatch =>{
    axios.get('/api/goods/')
        .then (res => {
            dispatch({
                type: GET_GOODS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE GOODS
export const deleteGoods = goods => dispatch =>{
    axios.delete(`/api/goods/${goods}/`)
        .then (res => {
            dispatch({
                type: DELETE_GOODS,
                payload: goods
            });
        }).catch(err => console.log(err));
}

// ADD GOODS
export const addGoods = goods => dispatch =>{
    axios.post('/api/goods/',goods)
        .then (res => {
            dispatch({
                type: ADD_GOODS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// PUT GOODS
export const putGoods = goods => dispatch =>{
    axios.put(`/api/goods/${goods.goods}/`,goods)
        .then (res => {
            dispatch({
                type: PUT_GOODS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}