import { Component, OnInit, Input } from '@angular/core';
import { HyperShopContentModel } from 'ntk-cms-api';
import { ProductService } from 'src/app/components/shared/services/product.service';


@Component({
  selector: 'app-product-vertical',
  templateUrl: './product-vertical.component.html',
  styleUrls: ['./product-vertical.component.sass']
})
export class ProductVerticalComponent implements OnInit {

 @Input() products: HyperShopContentModel[];

  constructor(private productService: ProductService ) { }

  ngOnInit() {
    // this.productService.getProducts()
    // .subscribe (
    // product => this.products = product
    // )
  }

}
