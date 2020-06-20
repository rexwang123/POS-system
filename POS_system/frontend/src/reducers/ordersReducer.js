import { GET_ORDERS, DELETE_ORDERS, ADD_ORDERS, PUT_ORDERS, GET_ONE_ORDER, GET_RECENT_ORDERS} from '../actions/types.js';

const initialState = {
    orders: [],
    recent_orders:[],
    order: "initial"
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
                orders: state.orders.filter(order => order.orderId != action.payload),
                recent_orders: state.recent_orders.filter(order => order.orderId != action.payload)
            };

        case ADD_ORDERS:
            return{
                ...state,
                orders: [...state.orders,action.payload]
            };

        case PUT_ORDERS:
            return{
                ...state,
                recent_orders: state.recent_orders.map(order => {
                    if(order.orderId == action.payload.orderId){
                        return {...action.payload, customer:order.customer}
                    }
                    else{
                        return order
                    } 
                })
            };
            
        case GET_ONE_ORDER:
            return{
                ...state,
                order: action.payload
            };

        case GET_RECENT_ORDERS:
            return{
                ...state,
                recent_orders:action.payload
            };

        default:
            return state
    }

}