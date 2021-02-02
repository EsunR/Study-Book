export interface IProductCard {
  code: string;
}

export interface IProductOrder {
  code: string;
  color: string;
  productCard: IProductCard[];
}
