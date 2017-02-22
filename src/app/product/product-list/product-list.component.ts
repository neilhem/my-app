import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../../shared/product.service';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  $categories: Observable<any>;
  $products: Observable<any>;

  createCategorySubmitted = false;
  deleteCategorySubmitted = false;
  createProductSubmitted = false;

  createCategory: FormGroup;
  deleteCategory: FormGroup;

  createForm: FormGroup;

  message: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.$categories = this.categoryService.getList();

    this.$products = this.route.queryParams.switchMap((params: Params) => {
      return this.productService.getList(params);
    });

    this.createCategory = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.deleteCategory = this.formBuilder.group({
      id: ['', [Validators.required]],
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

    this.categoryService.create(value).subscribe((data: any) => {
      this.createCategorySubmitted = true;
      this.message = data.message;
    });
  }

  deleteCategoryOnSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) { return; }

    this.categoryService.delete(value.id).subscribe((data: any) => {
      this.createCategorySubmitted = true;
      this.message = data.message;
    });
  }

  createOnSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) { return; }

    this.productService.create(value).subscribe((data: any) => {
      this.createProductSubmitted = true;
      this.message = data.message;
    });
  }

}
