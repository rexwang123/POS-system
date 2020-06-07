import { GET_CARTS, DELETE_CARTS, ADD_CARTS, PUT_CARTS} from '../actions/types.js';

const initialState = {
    carts: []
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
        default:
            return state
    }

}