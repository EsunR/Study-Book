export type ProductType = "return" | "expected" | "wait" | "normal";

export interface IProductCard {
  id: any;
  code: string;
  type: ProductType;
}

export interface IProductOrder {
  id: any;
  code: string;
  color: string;
  productCard: IProductCard[];
}
