import { Component, OnInit } from '@angular/core';

import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.sass']
})
export class HeaderTwoComponent implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  products: HyperShopContentModel[];
  indexProduct: number;
  public sidenavMenuItems:Array<any>;
  shoppingCartItems: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
   }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }
  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }
}
