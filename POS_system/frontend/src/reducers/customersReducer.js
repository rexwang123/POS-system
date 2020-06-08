import { GET_CUSTOMERS, DELETE_CUSTOMERS, ADD_CUSTOMERS, PUT_CUSTOMERS} from '../actions/types.js';

const initialState = {
    customers: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CUSTOMERS:
            return{
                ...state,
                customers: action.payload
            };
        case DELETE_CUSTOMERS:
            return{
                ...state,
                customers: state.customers.filter(customer => customer.id != action.payload)
            };

        case ADD_CUSTOMERS:
            return{
                ...state,
                customers: [...state.customers,action.payload]
            };

        case PUT_CUSTOMERS:
            return{
                ...state,
                customers: [...state.customers]
            };
        default:
            return state
    }

}