import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FaCartPlus } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { RiCoupon2Line } from 'react-icons/ri';
import { MdRemoveShoppingCart } from 'react-icons/md';
import {
    ProductPriceProps,
    ProductItemProps,
} from 'components/Product/ProductProps';
import { addProductToCart, removeProductFromCart } from 'actions/cartAction';

const ProductItemContainer = styled.li`
    display: inline-flex;
    min-width: 30%;
    flex: 1;
    height: auto;
    flex-direction: column;
    margin: 15px;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &:hover {
        .product-overlay {
            opacity: 1;
        }

        .product-image {
            transform: scale(1.1);
        }
    }
`;

const ProductImageContainer = styled.div`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.4s ease;
`;

const ProductDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ProductTitle = styled.h2`
    font-size: 14px;
    margin: 10px 0 5px 0;
    height: 20px;
`;

const ProductScore = styled.div`
    font-size: 11px;
    margin: 0px 8px 0px 0px;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
`;

const ProductScoreIcon = styled(AiFillHeart)`
    height: 12px;
    margin-right: 2px;
    fill: rgb(133, 138, 141);
`;

const ProductScoreText = styled.span`
    color: rgb(133, 138, 141);
`;

const ProductPriceContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ProductPrice = styled.div<ProductPriceProps>`
    display: inline-flex;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.15px;
    color: ${(props) => props.color};
    font-weight: bold;
    text-decoration: ${(props) =>
        props.availableCoupon ? 'line-through' : 'none'};
`;

const CouponIcon = styled(RiCoupon2Line)`
    fill: red;
    height: 14px;
    margin-left: 6px;
    margin-right: 2px;
`;

const Divisor = styled.hr`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid rgb(242, 244, 245);
`;

const ProductOverlayContainer = styled.div`
    opacity: 0;
    transition: opacity 0.5s ease;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
`;

const AddCartIcon = styled(FaCartPlus)`
    width: 3rem;
    height: 3rem;
    fill: rgba(255, 255, 255, 0.9);
    margin-bottom: 6px;
`;

const RemoveCartIcon = styled(MdRemoveShoppingCart)`
    width: 3rem;
    height: 3rem;
    fill: rgba(255, 255, 255, 0.9);
    margin-bottom: 6px;
`;

const ProductOverlayText = styled.div`
    color: rgba(255, 255, 255, 0.9);
    font-size: 20px;
    font-weight: bold;
`;

function ProductItem({
    id,
    title,
    coverImage,
    price,
    score,
    availableCoupon = true,
    isInCart = false,
}: ProductItemProps): React.ReactElement {
    const dispatch = useDispatch();

    return (
        <ProductItemContainer>
            <ProductImageContainer>
                <ProductImage src={coverImage} className="product-image" />
            </ProductImageContainer>
            <ProductDetailContainer>
                <ProductTitle>{title}</ProductTitle>
                <ProductScore>
                    <ProductScoreIcon />
                    <ProductScoreText>{score}</ProductScoreText>
                </ProductScore>
                <Divisor />
                <ProductPriceContainer>
                    <ProductPrice
                        availableCoupon={availableCoupon}
                        color="rgb(27, 28, 29)"
                    >
                        {price}원
                    </ProductPrice>
                    {availableCoupon && (
                        <>
                            <CouponIcon />
                            <ProductPrice availableCoupon={false} color="red">
                                쿠폰 적용 가능
                            </ProductPrice>
                        </>
                    )}
                </ProductPriceContainer>
            </ProductDetailContainer>
            <ProductOverlayContainer
                className="product-overlay"
                onClick={
                    isInCart
                        ? () => console.log('At cart')
                        : () => console.log('No cart')
                }
            >
                {isInCart ? <RemoveCartIcon /> : <AddCartIcon />}
                <ProductOverlayText>
                    {isInCart
                        ? '클릭 시 장바구니에서 삭제됩니다.'
                        : '클릭 시 장바구니에 추가됩니다.'}
                </ProductOverlayText>
            </ProductOverlayContainer>
        </ProductItemContainer>
    );
}

export default ProductItem;
