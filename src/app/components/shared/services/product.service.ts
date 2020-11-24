import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { HyperShopContentModel } from 'ntk-cms-api';



// Get product from Localstorage
const products = JSON.parse(localStorage.getItem('compareItem')) || [];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currency = 'USD';
  public catalogMode = false;

  private _url = 'assets/data/';
  public url = 'assets/data/banners.json';

  public compareProducts: BehaviorSubject<HyperShopContentModel[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {
    this.compareProducts.subscribe(products => products = products)
  }

  private products(): Observable<HyperShopContentModel[]> {
    return this.httpClient.get<HyperShopContentModel[]>('assets/data/products2.json');
  }

  public banners(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }


  // Get Banners
  public getBanners() {
    return this.banners();
  }

  // Get Banners
  public getProducts(): Observable<HyperShopContentModel[]> {
    return this.products();
  }


  // Get Products By Id
  public getProduct(id: string): Observable<HyperShopContentModel> {
    return this.products().pipe(map(items => {
      return items.find((item: HyperShopContentModel) => { return item.Code === id; });
    }));
    // return this.products.find(product=> product.id === id);

    // return this.httpClient.get<Product>(this._url + 'product-' + id + '.json');
  }


  /*
---------------------------------------------
----------  Compare Product  ----------------
---------------------------------------------
*/

  // Get Compare Products
  public getComapreProducts(): Observable<HyperShopContentModel[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return itemsStream as Observable<HyperShopContentModel[]>;
  }

  // If item is aleready added In compare
  public hasProduct(product: HyperShopContentModel): boolean {
    const item = products.find(item => item.id === product.Code);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: HyperShopContentModel): HyperShopContentModel | boolean {
    let message, status;
    let item: HyperShopContentModel | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.Code)[0];
      const index = products.indexOf(item);
      this.snackBar.open('The product  ' + product.Name + ' already added to comparison list.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    } else {
      if (products.length < 4)
        products.push(product);
      message = 'The product ' + product.Name + ' has been added to comparison list.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

    }
    localStorage.setItem('compareItem', JSON.stringify(products));
    return item;
  }

  // Removed Product
  public removeFromCompare(product: HyperShopContentModel) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem('compareItem', JSON.stringify(products));
  }

  // Get Products By category
  public getProductByCategory(category: string): Observable<HyperShopContentModel[]> {
    return this.products().pipe(map(items =>
      items.filter((item: HyperShopContentModel) => {
        if (category == 'all')
          return item
        else
          return item.Category === category;

      })
    ));
  }

}
