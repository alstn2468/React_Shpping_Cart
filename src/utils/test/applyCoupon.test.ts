import { applyCoupon } from 'utils/applyCoupon';
import { ICouponItem } from 'models/ICouponItem';

const RateCoupon: ICouponItem = {
    type: 'rate',
    title: '비율 테스트 쿠폰',
    discountRate: 5,
};

const AmountCoupon: ICouponItem = {
    type: 'amount',
    title: '값 테스트 쿠폰',
    discountAmount: 2000,
};

describe('applyCoupon 유틸 함수 테스트', () => {
    it('10000원 상품에 5% 비율 쿠폰 적용 테스트 -> (500원 할인, 정수)', () => {
        expect(500).toEqual(applyCoupon(10000, RateCoupon));
    });

    it('10000원 상품에 2000원 쿠폰 적용 테스트 -> (2000원 할인, 정수)', () => {
        expect(2000).toEqual(applyCoupon(10000, AmountCoupon));
    });

    it('7050원 상품에 5% 비율 쿠폰 적용 테스트 -> (352원 할인, 실수)', () => {
        expect(352).toEqual(applyCoupon(7050, RateCoupon));
    });
});
