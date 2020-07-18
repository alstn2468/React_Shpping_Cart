import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'reducers';
import { getCouponList } from 'actions/thunkAction';

const OverlayDialogContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const CouponDialogContainer = styled.div`
    width: 600px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 10px;
    color: #000000;
`;

function CouponDialog(): React.ReactElement {
    const dispatch = useDispatch();
    const { loading, isOpen, coupons, error } = useSelector(
        (state: RootState) => state.coupon,
    );

    React.useEffect(() => {
        dispatch(getCouponList());
    }, [isOpen]);

    return (
        isOpen && (
            <OverlayDialogContainer>
                <CouponDialogContainer>
                    {loading ? (
                        <div>Loading</div>
                    ) : (
                        coupons.map((coupon) => <div>{coupon.title}</div>)
                    )}
                </CouponDialogContainer>
            </OverlayDialogContainer>
        )
    );
}

export default CouponDialog;
