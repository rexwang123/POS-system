import { GET_CARTS, DELETE_CARTS, ADD_CARTS, PUT_CARTS, GET_CARTS_BY_DATES} from '../actions/types.js';

const initialState = {
    carts: [],
    carts_by_dates: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CARTS:
            return{
                ...state,
                carts: action.payload
            };
        case DELETE_CARTS:
            return{
                ...state,
                carts: state.carts.filter(carts => carts.carts != action.payload)
            };

        case ADD_CARTS:
            return{
                ...state,
                carts: [...state.carts,action.payload]
            };

        case PUT_CARTS:
            return{
                ...state,
                carts: [...state.carts]
            };
        
        case GET_CARTS_BY_DATES:
            return{
                ...state,
                carts_by_dates: action.payload
            };
        default:
            return state
    }

}