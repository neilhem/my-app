import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ModalDirective } from 'ng2-bootstrap';

import { CategoryService } from '../../shared/category.service';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements AfterViewInit, OnInit {
  @ViewChild('modal') modal: ModalDirective;

  $categories: Observable<any>;

  form: FormGroup;
  message: string;
  submitted: boolean;

  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.$categories = this.categoryService.getList();
    this.id = +this.route.snapshot.params['id'];
    this.buildForm();

    this.productService.getDetail(this.id).subscribe((data: any) => {
      this.form.patchValue(data[0]);
    });
  }

  ngAfterViewInit() {
    this.modal.show();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
    });
  }

  onModalShow(event) {
    this.submitted = false;
    this.form.reset();
  }

  onModalHidden(event) {
    this.router.navigate([{outlets: {popup: null}}], {
      preserveQueryParams: true
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }): void {
    if (!valid) { return; }

    this.productService.update(value).subscribe(data => {
      this.submitted = true;
      this.message = data.message;
    });
  }
}
