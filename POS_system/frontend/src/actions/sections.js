import axios from 'axios';

import {GET_SECTIONS, DELETE_SECTIONS, ADD_SECTIONS, PUT_SECTIONS} from './types';

// GET SECTIONS
export const getSections = () => dispatch =>{
    axios.get('/api/sections/')
        .then (res => {
            dispatch({
                type: GET_SECTIONS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE SECTIONS
export const deleteSections = id => dispatch =>{
    axios.delete(`/api/sections/${id}/`)
        .then (res => {
            dispatch({
                type: DELETE_SECTIONS,
                payload: id
            });
        }).catch(err => console.log(err));
}

// ADD SECTIONS
export const addSections = section => dispatch =>{
    axios.post('api/sections/',section)
        .then (res => {
            dispatch({
                type: ADD_SECTIONS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// PUT SECTIONS
export const putSections = section => dispatch =>{
    axios.put(`/api/sections/${section.id}/`,)
        .then (res => {
            dispatch({
                type: PUT_SECTIONS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

