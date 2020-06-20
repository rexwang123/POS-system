import { GET_CUSTOMERS, DELETE_CUSTOMERS, ADD_CUSTOMERS, PUT_CUSTOMERS, GET_ONE_CUSTOMER} from '../actions/types.js';

const initialState = {
    customers: [],
    customer:""
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
                customers: state.customers.filter(customer => customer.number != action.payload)
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

        case GET_ONE_CUSTOMER:
            return{
                ...state,
                customer: action.payload
            };
        default:
            return state
    }

}