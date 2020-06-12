import axios from 'axios';

import {GET_ENTRIES, DELETE_ENTRIES, ADD_ENTRIES, PUT_ENTRIES} from './types';

// GET ENTRIES
export const getEntries = () => dispatch =>{
    axios.get('/api/entries/')
        .then (res => {
            dispatch({
                type: GET_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE ENTRIES
export const deleteEntries = id => dispatch =>{
    axios.delete(`/api/entries/${id}/`)
        .then (res => {
            dispatch({
                type: DELETE_ENTRIES,
                payload: id
            });
        }).catch(err => console.log(err));
}

// ADD ENTRIES
export const addEntries = entry => dispatch =>{
    axios.post('api/entries/',entry)
        .then (res => {
            dispatch({
                type: ADD_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// PUT ENTRIES
export const putEntries = entry => dispatch =>{
    axios.put(`/api/entries/${entry.id}/`,entry)
        .then (res => {
            dispatch({
                type: PUT_ENTRIES,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

