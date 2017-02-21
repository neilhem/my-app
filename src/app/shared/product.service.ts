import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private http: Http) {}

  getCategoriesList(): Observable<any> {
    return this.http.get('http://localhost:8080/api/categories').map(res => res.json());
  }

  createCategory(data): Observable<any> {
    const headers = new Headers();
    const body = JSON.stringify(data);

    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:8080/api/categories', body, {headers});
  }

  getList(): Observable<any> {
    return this.http.get('http://localhost:8080/api/products').map(res => res.json());
  }

  create(data: any): Observable<any> {
    const headers = new Headers();
    const body = JSON.stringify(data);

    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:8080/api/products', body, {headers});
  }

}
