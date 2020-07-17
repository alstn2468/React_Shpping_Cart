export interface IProductItem {
    id: string;
    title: string;
    coverImage: string;
    price: number;
    score: number;
    availableCoupon?: boolean;
}
