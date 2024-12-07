import { Product } from './../product';
import { ProductService } from '../services/product.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Store } from '@ngrx/store';
import { Observable, isEmpty } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProducts } from '../prod/products.actions';
import { selectProducts, selectProductLoading, selectProductError } from '../prod/products.selectors';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../../app/shared/components/card/card.component';
// import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productCategories: any;
  products: Product[]= [];
  hideGridView: boolean= true;
  categoryImageUrl: string="";
  productStore$ = new Observable<Product>;
  loading = false;
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  showProduct: boolean = false;
  currentIndex = 0;

  // try
  
  
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private store: Store,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private cartservice: CartService,
    private authService: AuthenticationService,
    private router: Router,
   
  ) {
  }
  ngOnInit(): void {
    this.testNewStore();
  }
  testNewStore() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductLoading);
    this.error$ = this.store.select(selectProductError);
    this.products$.subscribe({
      next: (value: any) => {
        this.products = value.products;
        this.products&&this.products.length>1 ? this.showProduct = true: this.showProduct= false;
        this.cdr.detectChanges();
        
      },
      complete: () => {
        console.log(this.products, "this.products in complete");
        this.cdr.detectChanges();
      }
    });
   
  }
  loadDetailsPage(prod:Product) {
    // navigate to details page
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(CartComponent,{
    });
    dialogRef.componentInstance.product = prod;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // nextProduct() {
  //   this.currentIndex += 3;  // Increment index by 3
  //   this.products = this.products.slice(this.currentIndex, this.currentIndex + 3);  // Update products to show
  // }

  // previousProduct() {
  //   this.currentIndex -= 3; // Decrement index by 3
  //   this.products = this.products.slice(this.currentIndex, this.currentIndex + 3);// Update products to show
  // }


  // isPreviousDisabled(): boolean {
  //   return this.currentIndex <= 0;
  // }

  // isNextDisabled(): boolean {
  //   return this.currentIndex + 3 >= this.products.length;
  // }
  increment(product: any) {
    if (!product.quantity) {
      product.quantity = 1;
    } else {
      product.quantity++;
    }
  }

  decrementQuantity(product: any) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
    }
  }
  getQuantity(product: any): number {
    return product.quantity || 1;
  }
  addProductToCart(prod: Product) {
    const user = this.authService.getCurrentUser();
    if(user.username!==""){
      let addToCartObj = {
        userId: user.userId,
        products:[{
          id: prod.id,
          quantity:1
        }]
        
      }
      this.cartservice.addTocart(addToCartObj).subscribe((resp)=> {
        if(resp){
          alert("product added to cart succesfully");
          this.cartservice.getCartByCustId(user.userId).subscribe((data) =>{
            console.log(data);
          })
          this.cartservice.getAllCarts().subscribe((data) =>{
            console.log(data);
          })
        } else {
          alert ("failed to add product to Cart");
        }
      },
      (error)=> {
        console.log("failed to add reason:"+ error);
      }
    )
    } else {
      alert("user is not login. please login");
      const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      // doNothing for now
    });
    }
    
  }

  
  }



  

  


