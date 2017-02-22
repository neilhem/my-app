import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
  ],
})
export class ProductModule { }
