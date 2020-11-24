import { Component, OnInit, Input } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../services/product.service';
import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-shopping-widgets',
  templateUrl: './shopping-widgets.component.html',
  styleUrls: ['./shopping-widgets.component.sass']
})
export class ShoppingWidgetsComponent implements OnInit {

  products: HyperShopContentModel[];
  indexProduct: string;

  public sidenavMenuItems:Array<any>;

  @Input() shoppingCartItems: CartItem[] = [];

  constructor(private cartService: CartService, public productService: ProductService) { }

  ngOnInit() {
  }
  public updateCurrency(curr) {
    this.productService.currency = curr;
  }


  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

}
