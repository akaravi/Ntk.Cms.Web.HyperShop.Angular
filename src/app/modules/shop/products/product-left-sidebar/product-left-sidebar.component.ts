import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ColorFilter } from 'src/app/modals/product.model';
import { HyperShopContentModel, HyperShopContentService, FilterModel, FilterDataModel, CoreSiteModel } from 'ntk-cms-api';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();

  public sidenavOpen = true;
  public animation: any;   // Animation
  public sortByOrder = '';   // sorting
  public page: any;
  public tagsFilters: any[] = [];
  public viewType = 'grid';
  public viewCol = 25;
  public colorFilters: ColorFilter[] = [];

  public items: HyperShopContentModel[] = [];
  public allItems: HyperShopContentModel[] = [];
  public products: HyperShopContentModel[] = [];
  public tags: any[] = [];
  public colors: any[] = [];

  constructor(
    private hyperShopContentService: HyperShopContentService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        this.dataGetAll(params.category)
      }
    )
  }
  dataGetAll(category: number): void {
    const filteModelContent = new FilterModel();
    if (category>0) {
      const filterDataModel = new FilterDataModel();
      filterDataModel.propertyName = 'CategoryCode';
      filterDataModel.value = category;
      filteModelContent.filters.push(filterDataModel);
    }
    this.hyperShopContentService.ServiceGetAllMicroService(filteModelContent).subscribe(products => {
      this.allItems = products.listItems;
      this.products = products.listItems.slice(0.8);
      this.getTags(products)
      this.getColors(products)
    })
  }



  // Get current product tags
  public getTags(products) {
    const uniqueBrands = []
    const itemBrand = Array();
    products.map((product, index) => {
      if (product.tags) {
        product.tags.map((tag) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        })
      }
    });
    for (let i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] })
    }
    this.tags = itemBrand
  }

  // Get current product colors
  public getColors(products) {
    const uniqueColors = []
    const itemColor = Array();
    products.map((product, index) => {
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        })
      }
    });
    for (let i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor
  }

  ngOnInit() {
  }



  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Initialize filetr Items
  public filterItems(): HyperShopContentModel[] {
    return this.items.filter((item: HyperShopContentModel) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);
      const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return prev && true;
          }
        }
      }, true);
      return Colors && Tags; // return true
    });

  }

  public onPageChanged(event) {
    this.page = event;
    // this.allItems;
    window.scrollTo(0, 0);
  }


  // Update price filter
  //   public updatePriceFilters(price: any) {
  //     let items: any[] = [];
  //     this.products.filter((item: Product) => {
  //         if (item.price >= price[0] && item.price <= price[1] )  {
  //            items.push(item); // push in array
  //         }
  //     });
  //     this.items = items;
  // }


  // Update price filter
  public updatePriceFilters(price: any) {
    console.log(price);
    console.log(this.products);


    this.allItems = this.products.filter((item: HyperShopContentModel) => {
      return item.price >= price.priceFrom && item.price <= price.priceTo
    });
    console.log(this.products);

  }

  onBrendsChanged(newBrend) {
    console.log(newBrend);
    this.allItems = newBrend === 'all' ? this.products : this.products.filter(

      item => item.brand === newBrend
    )
    console.log(this.allItems);


  }
}
