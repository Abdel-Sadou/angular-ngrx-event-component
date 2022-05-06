import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../service/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  formGroupProduct:FormGroup;
  error ?:string;

  constructor(private productsServices: ProductsService, private router: Router, private fb: FormBuilder) {
    this.formGroupProduct = this.fb.group({
      name:["",Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:[false, Validators.required],
      available:[true, Validators.required]
    })
  }

  ngOnInit(): void {
  }



  onSaveProduct() {

    this.productsServices.saveProduct(this.formGroupProduct.value).subscribe(data=>{},error => {this.error= error})
    if (this.error=="" || this.error==undefined){
      this.router.navigateByUrl('/products');
    }
  }
}
