import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../service/products.service";
import {NgForm} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId?: number;
  product!: Product;
  error!:any;
  constructor(private activatedRoute: ActivatedRoute, private productService:ProductsService) {
    this.productId = activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(
      data=>{
        this.product = data;
      }
    )
  }

  updateProduct() {
    console.log("----------------------------------------------------------------------");
    if (this.productId != null) {
      this.product.id = this.productId;
    }
    console.log(this.product)
    if (confirm("modifiez-vous ce produit?"))
    this.productService.updateProduct(this.product).subscribe(data=>{ }, error => {this.error=error});
  }
}
