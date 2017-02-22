import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/product/product.module#ProductModule',
  },
  {
    path: ':id/delete',
    component: ProductDeleteComponent,
    outlet: 'popup',
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    outlet: 'popup',
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
