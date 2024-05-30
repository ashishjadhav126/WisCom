import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../type';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  getProductCategories():Observable<Category[]> {
    return this.http.get<Category[]>('https://dummyjson.com/products/categories');
  }
  getProducts() {
   return this.http.get('https://dummyjson.com/products/')
}
getProductsByCat(catName:any) {
  return this.http.get('https://dummyjson.com/products/category/'+ catName)
}
}
