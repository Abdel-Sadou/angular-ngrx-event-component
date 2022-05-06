import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state.js";
import {Product} from "../../model/product.model";
import {ProductsService} from "../../service/products.service";
import {Router} from "@angular/router";
import {data} from "autoprefixer";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  listProducts$?:Observable<AppDataState<Product[]>>;
  readonly  DataStateEnum = DataStateEnum;

  constructor(private productsServices: ProductsService, private router: Router) {}
  ngOnInit(): void {
  }
  onGetAllProducts(){
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS, payload:null});
  }

  onGetSelectedProduct() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS, payload : null});
  }

  onGetAvailable() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS, payload: null});
  }

  onSearch(dataForm:any) {
    this.productEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload : dataForm});
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

}

