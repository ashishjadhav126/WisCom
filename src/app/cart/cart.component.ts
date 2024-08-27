import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../type';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnChanges {
  
  @Input()
  product!: Product;
  user:any = { username: '', userId: '' };
  cartList:any =[];
  constructor(
    private authService: AuthenticationService,
    private cartService: CartService,
  ) {
    this.user= this.authService.getCurrentUser();
    this.getcartData();
  }
  ngOnChanges(changes: SimpleChanges): void {
 
  }
  ngOnInit(): void {
  
  }
  
  getcartData() {
    this.cartService.getAllCarts().subscribe((data:any)=> {
      this.cartList= data.carts;
     })
  }
}
