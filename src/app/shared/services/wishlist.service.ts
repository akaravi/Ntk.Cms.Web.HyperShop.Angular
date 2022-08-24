import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs';
import { HyperShopContentModel } from 'ntk-cms-api';

// Get product from Localstorage
const products = JSON.parse(localStorage.getItem('wishlistItem')) || [];

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // wishlist array
  public wishlistProducts: BehaviorSubject<HyperShopContentModel[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(public snackBar: MatSnackBar) { }

  // Get  wishlist Products
  public getProducts(): Observable<HyperShopContentModel[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return itemsStream as Observable<HyperShopContentModel[]>;
  }


  // If item is aleready added In wishlist
  public hasProduct(product: HyperShopContentModel): boolean {
    const item = products.find(x => x.id === product.code);
    return item !== undefined;
  }

  // Add to wishlist
  public addToWishlist(product: HyperShopContentModel): HyperShopContentModel | boolean {
    let message='';
    let status='';
    let item: HyperShopContentModel | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.code)[0];
      const index = products.indexOf(item);
    } else {
      products.push(product);
    }
    message = 'The product ' + product.name + ' has been added to wishlist.';
    status = 'success';
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    localStorage.setItem('wishlistItem', JSON.stringify(products));
    return item;
  }


  // Removed Product
  public removeFromWishlist(product: HyperShopContentModel) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem('wishlistItem', JSON.stringify(products));
  }
}
