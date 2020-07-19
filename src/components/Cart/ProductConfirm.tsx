import * as React from 'react';
import styled from 'styled-components';
import ApplyCouponButton from 'components/Cart/ApplyCouponButton';
import RemoveCouponButton from 'components/Cart/RemoveCouponButton';
import { numberWithComma } from 'utils/numberWithComma';
import { ICouponItem } from 'models/ICouponItem';

type ProductConfirmProp = {
    availableCoupon: boolean;
    coupon?: ICouponItem;
    totalPrice: number;
    onApplyCouponButtonClicked: () => void;
    onRemoveCouponButtonClicked: () => void;
};

const ConfirmationContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const TotalPriceText = styled.div`
    height: 40px;
    width: calc(100% - 120px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 16px;
`;

function ProductConfirm({
    coupon,
    totalPrice,
    availableCoupon,
    onApplyCouponButtonClicked,
    onRemoveCouponButtonClicked,
}: ProductConfirmProp): React.ReactElement {
    return (
        <ConfirmationContainer>
            <ApplyCouponButton
                availableCoupon={availableCoupon}
                onButtonClicked={onApplyCouponButtonClicked}
                hasCoupon={Boolean(coupon)}
                couponTitle={Boolean(coupon) && coupon.title}
            />
            {availableCoupon && Boolean(coupon) && (
                <RemoveCouponButton
                    onButtonClicked={onRemoveCouponButtonClicked}
                />
            )}
            <TotalPriceText>총 {numberWithComma(totalPrice)} 원</TotalPriceText>
        </ConfirmationContainer>
    );
}

export default ProductConfirm;
