import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap/modal';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

import { ProductService } from './shared/product.service';
import { CategoryService } from './shared/category.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProductDeleteComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
