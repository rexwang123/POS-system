import {combineReducers} from 'redux'
import customersReducer from './customersReducer';
import goodsReducer from './goodsReducer';
import cartsReducer from './cartsReducer';

export default combineReducers({
    customers: customersReducer,
    goods: goodsReducer,
    carts: cartsReducer
});
