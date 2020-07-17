import { combineReducers } from 'redux';
import productListReducer from 'reducers/productListReducer';
import cartReducer from 'reducers/cartReducer';

const rootReducer = combineReducers({
    product: productListReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
