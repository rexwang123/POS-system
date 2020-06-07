import { GET_GOODS, DELETE_GOODS, ADD_GOODS, PUT_GOODS} from '../actions/types.js';

const initialState = {
    goods: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_GOODS:
            return{
                ...state,
                goods: action.payload
            };
        case DELETE_GOODS:
            return{
                ...state,
                goods: state.goods.filter(goods => goods.goods != action.payload)
            };

        case ADD_GOODS:
            return{
                ...state,
                goods: [...state.goods,action.payload]
            };

        case PUT_GOODS:
            return{
                ...state,
                goods: [...state.goods]
            };
        default:
            return state
    }

}