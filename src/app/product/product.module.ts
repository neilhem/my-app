import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from '../shared/product.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ],
  declarations: [ProductListComponent],
  providers: [ProductService],
})
export class ProductModule { }
