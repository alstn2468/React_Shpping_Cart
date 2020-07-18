import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    INCREASE_CART_PRODUCT_AMOUNT,
    DECREASE_CART_PRODUCT_AMOUNT,
    SELECT_PRODUCT_AT_CART,
    ADD_COUPON_AT_PRODUCT,
    REMOVE_COUPON_FROM_PRODUCT,
    CartAction,
} from 'actions/cartAction';
import { createReducer } from 'typesafe-actions';
import { ICartItem } from 'src/models/ICartItem';
import { applyCoupon } from 'utils/applyCoupon';

export type CartState = {
    cartItemCounts: number;
    cartItems: ICartItem[];
    price: number;
    discountPrice: number;
    error?: string;
};

const initialState: CartState = {
    cartItemCounts: 0,
    cartItems: [],
    price: 0,
    discountPrice: 0,
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
    [INCREASE_CART_PRODUCT_AMOUNT]: (state, action) => {
        let productPrice = 0;
        return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload) {
                    productPrice = cartItem.price;
                    return {
                        ...cartItem,
                        amount: cartItem.amount + 1,
                    };
                }
                return {
                    ...cartItem,
                };
            }),
            price: state.price + productPrice,
        };
    },
    [DECREASE_CART_PRODUCT_AMOUNT]: (state, action) => {
        let productPrice = 0;
        return {
            ...state,
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload && cartItem.amount > 1) {
                    productPrice = cartItem.price;
                    return {
                        ...cartItem,
                        amount: cartItem.amount - 1,
                    };
                }
                return {
                    ...cartItem,
                };
            }),
            price: state.price - productPrice,
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
            price:
                state.price +
                (product.isSelected
                    ? -(product.price * product.amount)
                    : product.price * product.amount),
        };
    },
    [ADD_COUPON_AT_PRODUCT]: (state, action) => {
        const product = state.cartItems.find(
            (cartItem) => cartItem.id === action.payload.productId,
        );
        console.log(
            applyCoupon(product.price, product.amount, action.payload.coupon),
        );

        return {
            ...state,
            discountPrice:
                state.discountPrice +
                applyCoupon(
                    product.price,
                    product.amount,
                    action.payload.coupon,
                ),
        };
    },
    [REMOVE_COUPON_FROM_PRODUCT]: (state, action) => {
        const product = state.cartItems.find(
            (cartItem) => cartItem.id === action.payload.productId,
        );
        return {
            ...state,
            discountPrice:
                state.discountPrice -
                applyCoupon(
                    product.price,
                    product.amount,
                    action.payload.coupon,
                ),
        };
    },
});

export default cartReducer;
