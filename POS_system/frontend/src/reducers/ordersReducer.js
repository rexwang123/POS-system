import { GET_ORDERS, DELETE_ORDERS, ADD_ORDERS, PUT_ORDERS} from '../actions/types.js';

const initialState = {
    orders: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload
            };
        case DELETE_ORDERS:
            return{
                ...state,
                orders: state.orders.filter(order => order.orderId != action.payload)
            };

        case ADD_ORDERS:
            return{
                ...state,
                orders: [...state.orders,action.payload]
            };

        case PUT_ORDERS:
            return{
                ...state,
                orders: [...state.orders]
            };
        
        default:
            return state
    }

}