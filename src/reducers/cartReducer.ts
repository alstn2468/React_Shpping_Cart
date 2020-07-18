import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    REMOVE_ALL_PRODUCT_FROM_CART,
    INCREASE_CART_PRODUCT_AMOUNT,
    DECREASE_CART_PRODUCT_AMOUNT,
    SELECT_PRODUCT_AT_CART,
    SELECT_ALL_PRODUCT_AT_CART,
    CartAction,
} from 'actions/cartAction';
import { createReducer } from 'typesafe-actions';
import { ICartItem } from 'src/models/ICartItem';
import productItem from 'data/productItem';

export type CartState = {
    cartItemCounts: number;
    cartItems: ICartItem[];
    price: number;
    error?: string;
};

const initialState: CartState = {
    cartItemCounts: 0,
    cartItems: [],
    price: 0,
    error: null,
};

const cartReducer = createReducer<CartState, CartAction>(initialState, {
    [ADD_PRODUCT_TO_CART]: (state, action) => {
        if (state.cartItemCounts >= 3) {
            return state;
        }

        return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
            cartItemCounts: state.cartItemCounts + 1,
        };
    },
    [REMOVE_PRODUCT_FROM_CART]: (state, action) => {
        return {
            ...state,
            cartItems: [
                ...state.cartItems.filter(
                    (item) => item.id !== action.payload.id,
                ),
            ],
            cartItemCounts: state.cartItemCounts - 1,
        };
    },
    [REMOVE_ALL_PRODUCT_FROM_CART]: (state) => {
        return { ...state, ...initialState };
    },
    [INCREASE_CART_PRODUCT_AMOUNT]: (state, action) => {
        return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload) {
                    return {
                        ...cartItem,
                        amount: cartItem.amount + 1,
                    };
                }
                return {
                    ...cartItem,
                };
            }),
        };
    },
    [DECREASE_CART_PRODUCT_AMOUNT]: (state, action) => {
        return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload && cartItem.amount > 1) {
                    return {
                        ...cartItem,
                        amount: cartItem.amount - 1,
                    };
                }
                return {
                    ...cartItem,
                };
            }),
        };
    },
    [SELECT_PRODUCT_AT_CART]: (state, action) => {
        const product = state.cartItems.find(
            (cartItem) => cartItem.id === action.payload,
        );

        return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload) {
                    return { ...cartItem, isSelected: !cartItem.isSelected };
                }
                return { ...cartItem };
            }),
            price: state.price + product.price * product.amount,
        };
    },
    [SELECT_ALL_PRODUCT_AT_CART]: (state) => {
        return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => ({
                ...cartItem,
                isSelected: true,
            })),
            price: state.cartItems.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
                0,
            ),
        };
    },
});

export default cartReducer;
