import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import {
    selectProductAtCart,
    selectAllProductAtCart,
    removeAllProductFromCart,
} from 'actions/cartAction';

function Cart() {
    const { cartItemCounts, cartItems, selectedItems, price } = useSelector(
        (state: RootState) => state.cart,
    );

    return <div>CART</div>;
}

export default Cart;
