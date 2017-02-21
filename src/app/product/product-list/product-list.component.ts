import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  $categories: Observable<any>;
  $products: Observable<any>;

  createCategory: FormGroup;
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.$categories = this.productService.getCategoriesList();
    this.$products = this.productService.getList();

    this.createCategory = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.createForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  createCategoryOnSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) { return; }

    this.productService.createCategory(value).subscribe((data: any) => {
      console.log('Category Successfully created!');
    });
  }

  createOnSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) { return; }

    this.productService.create(value).subscribe((data: any) => {
      console.log('Product Successfully created!');
    });
  }

}
