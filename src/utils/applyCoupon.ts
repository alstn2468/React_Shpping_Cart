import { ICouponItem } from 'models/ICouponItem';

export function applyCoupon(
    price: number,
    amount: number,
    coupon: ICouponItem,
) {
    const { type, discountRate, discountAmount } = coupon;
    const basePrice: number = price * amount;

    if (type === 'rate') {
        return Math.floor(basePrice / discountRate);
    }

    return discountAmount;
}
