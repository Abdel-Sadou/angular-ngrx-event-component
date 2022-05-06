import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
host:String = environment.host;
  constructor( private http:HttpClient) { }


  getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products");
  }

  getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?selected=true");
  }

  getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?available=true");
  }

  searchProducts( keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?name_like="+keyword);
  }

  select( product:Product):Observable<Product>{
    product.selected = !product.selected;
    return this.http.put<Product>(this.host+"/products"+product.id,product);
  }

  deleteProduct(product:Product):Observable<void>{
    return this.http.delete<void>(this.host+"/products/"+product.id);
  }
  saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.host+"/products",product);
  }
  getProduct(id?:number):Observable<Product>{
    return this.http.get<Product>(this.host+"/products/"+id);
  }
  updateProduct(p:Product):Observable<Product>{
    return this.http.put<Product>(this.host+"/products/"+p.id, p);
  }
}
