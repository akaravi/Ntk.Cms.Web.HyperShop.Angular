import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { HyperShopContentModel, HyperShopContentService } from 'ntk-cms-api';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit ,AfterViewInit{

  public config: SwiperConfigInterface = {};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product: HyperShopContentModel = new HyperShopContentModel();
  public products: HyperShopContentModel[] = [];
  public image: any;
  public zoomImage: any;
  public counter = 1;
  constructor(private route: ActivatedRoute,
    private hyperShopContentService: HyperShopContentService,
    public productsService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartService) {
      this.loadingStatus = false;

    this.route.params.subscribe(params => {

      const id = params.id;
      this.hyperShopContentService.ServiceGetOneMicroService(id).subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.product = next.Item;
          }
          this.loadingStatus = false;
        },
        (error) => {
          this.loadingStatus = false;
        }
      );

    });
  }
  loadingStatus: boolean ;
  index: string;
  bigProductImageIndex = 0;
  ngOnInit() {



    this.getRelatedProducts();
  }


  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },


      }
    }
  }


  public openProductDialog(product, bigProductImageIndex) {
    const dialogRef = this.dialog.open(ProductZoomComponent, {
      data: { product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.Name]);
      }
    });
  }


  public selectImage(index) {
    console.log(this.product)
    console.log(index)
    this.bigProductImageIndex = index;
  }




  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  getRelatedProducts() {
    this.productsService.getProducts()
      .subscribe(
        (product: HyperShopContentModel[]) => {
          this.products = product
        });
  }

  // Add to cart
  public addToCart(product: HyperShopContentModel, quantity) {
    if (quantity === 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  // Add to cart
  public buyNow(product: HyperShopContentModel, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(product, parseInt(quantity));
    this.router.navigate(['/pages/checkout']);
  }



  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      const image = e.currentTarget;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const x = offsetX / image.offsetWidth * 100;
      const y = offsetY / image.offsetHeight * 100;
      const zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }



}


