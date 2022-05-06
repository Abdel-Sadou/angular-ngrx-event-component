import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Product} from "../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {data} from "autoprefixer";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../state/product.state.js";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    listProducts$?:Observable<AppDataState<Product[]>>;
    DataStateEnum = DataStateEnum;

  constructor(private productsServices: ProductsService, private router: Router) {}

  ngOnInit(): void {}

  onGetAllProducts(){
    this.listProducts$ = this.productsServices.getAllProduct().pipe(
      map((data)=>{
        return ({dataState: DataStateEnum.LOADED, data : data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message()}))
    )
  }

  onGetSelectedProduct() {
    this.listProducts$ = this.productsServices.getSelectedProducts().pipe(
      map((data)=>{

        return ({dataState: DataStateEnum.LOADED, data : data});

      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message()}))
    )
  }


  onGetAvailable() {
    this.listProducts$ = this.productsServices.getAvailableProducts().pipe(
      map((data)=>{

        return ({dataState: DataStateEnum.LOADED, data : data});

      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message()}))
    )
  }

  onSearch(dataForm:any) {
    this.listProducts$ = this.productsServices.searchProducts(dataForm['keyword']).pipe(
      map((data)=>{
        return ({dataState: DataStateEnum.LOADED, data : data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message()}))
    )
  }


  onselect(p:Product) {
    this.productsServices.select(p).subscribe(
      (data)=>{
        p.selected= data.selected;
      }
    )

  }

  onDelete(p:Product) {
   if (confirm("etes-vous sur de vouloir supprimer ce produit?")) {
     this.productsServices.deleteProduct(p).subscribe(
       data=>{
         this.onGetAllProducts()
       }
     );
   }
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  editProduct(p :Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEmitter($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
      this.onGetAllProducts();
      break;

      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
      this.onGetSelectedProduct();
      break;

      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
      this.onGetAvailable();
      break;

      case ProductActionsTypes.SEARCH_PRODUCTS:
      this.onSearch($event.payload);
      break;

    }

  }

  getNameSearch($event: any) {
    this.listProducts$ = this.productsServices.searchProducts($event).pipe(
      map((data)=>{
        return ({dataState: DataStateEnum.LOADED, data : data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message()}))
    )
  }

  actionProduct($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.Edit_PRODUCT:
        this.editProduct($event.payload);
        break;

      case ProductActionsTypes.Delete_PRODUCT:
        this.onDelete($event.payload);
        break;

      case ProductActionsTypes.Selected_PRODUCT:
        this.onselect($event.payload);
        break;
    }
  }

}
