export type CouponItem = {
    type: 'rate' | 'amount';
    title: string;
    discountRate?: number;
    discountAmount?: number;
};
