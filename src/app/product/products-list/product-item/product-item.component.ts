import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product.model";
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state.js";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() p! : Product;
  @Output() actionEmitter: EventEmitter<ActionEvent> = new  EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onselect(p: Product) {
    this.actionEmitter.emit({type:ProductActionsTypes.Selected_PRODUCT, payload: p})
  }

  onDelete(p: Product) {
    this.actionEmitter.emit({type:ProductActionsTypes.Delete_PRODUCT, payload: p})
  }

  editProduct(p: Product) {
    this.actionEmitter.emit({type:ProductActionsTypes.Edit_PRODUCT, payload: p})
  }
}
