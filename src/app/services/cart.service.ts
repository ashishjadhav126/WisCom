import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
  ) { }

  addTocart(obj: any) {
    const authHeader:HttpHeaders = new HttpHeaders();
    authHeader.set('Content-Type','application/json')
    return this.http.post('https://dummyjson.com/carts/add',
      obj,
      {
        headers:authHeader,
      }
    );
  }
  getCartByCustId(custId:number) {
    return this.http.get('https://dummyjson.com/carts/user/'+custId);
  }
  getAllCarts() {
    return this.http.get('https://dummyjson.com/carts');
  }
}
