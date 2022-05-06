import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state.js";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input()  listProducts$?:Observable<AppDataState<Product[]>>;
  @Input()  DataStateEnum = DataStateEnum;
  @Output() actionProductEventEmitter : EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  ActionEvent? : ActionEvent
  constructor() { }

  ngOnInit(): void {
  }

  onselect(p:Product) {
    this.actionProductEventEmitter.emit({type:ProductActionsTypes.Selected_PRODUCT, payload : p});
  }

  onDelete(p: Product) {
    this.actionProductEventEmitter.emit({type:ProductActionsTypes.Delete_PRODUCT, payload : p});
  }

  editProduct(p: Product) {
    this.actionProductEventEmitter.emit({type:ProductActionsTypes.Edit_PRODUCT, payload : p});
  }

  getEmitEvent($event: ActionEvent) {
    this.actionProductEventEmitter.emit($event);
  }

}
