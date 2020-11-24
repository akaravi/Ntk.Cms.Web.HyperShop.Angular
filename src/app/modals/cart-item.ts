import { HyperShopContentModel } from 'ntk-cms-api';

// cart items
export interface CartItem {
  product: HyperShopContentModel;
  quantity: number;
}
