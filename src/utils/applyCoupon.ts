import { ICouponItem } from 'models/ICouponItem';

export function applyCoupon(
    price: number,
    amount: number,
    coupon: ICouponItem,
) {
    const { type, discountRate, discountAmount } = coupon;

    if (type === 'rate') {
        return Math.floor((price * amount) / discountRate);
    }

    return discountAmount * amount;
}
