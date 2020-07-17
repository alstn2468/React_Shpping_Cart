export interface ICouponItem {
    type: 'rate' | 'amount';
    title: string;
    discountRate?: number;
    discountAmount?: number;
}
