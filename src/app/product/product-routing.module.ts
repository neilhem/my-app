import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
