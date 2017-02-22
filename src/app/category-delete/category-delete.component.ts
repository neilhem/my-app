import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap';

import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements AfterViewInit, OnInit {
  @ViewChild('modal') modal: ModalDirective;

  form: FormGroup;
  message: string;
  submitted: boolean;

  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.buildForm();
  }

  ngAfterViewInit() {
    this.modal.show();
    this.form.controls['id'].setValue(this.id);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
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

    this.categoryService.delete(value.id).subscribe(data => {
      this.submitted = true;
      this.message = data.message;
    });
  }

}
