import { Products } from './../type';
import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productCategories: any;
  products: any;
  hideGridView: boolean= true;
  categoryImageUrl: string="";
  productStore$ = new Observable<Products>;
  
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private store: Store<Products>,
  ) {
    this.productStore$ = store.select(this.products);
  }
  ngOnInit(): void {
    this.getcategory()
  }
  checkCheckBoxvalue(e:any) {
    if(e.target.checked) {
      this.hideGridView = true;
    } else {
      this.hideGridView = false;
    }
  }
  themeClass = "ag-theme-quartz";
  // Row Data: The data to be displayed.
  // rowData: IRow[] = [];

  // // Column Definitions: Defines & controls grid columns.
  // colDefs: ColDef[] = [
  //   { field: "name",flex: 1 },
  //   { field: "slug",flex: 1 },
  //   { field: "url",flex: 2 },
  // ];
  // onGridReady(params: GridReadyEvent) {
  //   this.productService.getProductCategories().subscribe((res:Category[]) => {
  //     this.rowData = res;
  // })
  // }
  getcategory() {
    let url:string="";
    // this.productService.getProductCategories().subscribe({ 
    //   next: (res:Category[]) => {
    //     this.productCategories = res;
    //     // this.productCategories.forEach((ele: Category) => {
    //     //   url = ele.url;
    //     //   this.http.get(url).subscribe((value:any) => {
    //     //   this.categoryImageUrl = value.products[0].images[0];
    //     //   })
          
    //     // })
    //   }   
        // });
        this.productService.getProducts().subscribe((res: any)=> {
          this.products = res.products;
        })
        // subscribe({
        //   next: (value:any) => {
        // const allCategories = this.productCategories.map((a: { name: any; }) => a.name);
        // const uniqueCat = new Set(allCategories)
        // uniqueCat.forEach((ele)=> {
        //   const prods: any = this.productService.getProductsByCat(ele)
        //   console.log(prods);
        //   })
        // console.log(uniqueArray)
      // console.log(this.productCategories);
  }
  showProducts(prod:Products) {
    console.log(prod)
  }
  }

