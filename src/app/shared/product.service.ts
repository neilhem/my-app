import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  url = 'http://localhost:8080/api/products';

  constructor(private http: Http) {}

  getList(params: Params): Observable<any> {
    return this.http.get(this.url, { search: params }).map(res => res.json());
  }

  getDetail(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`).map(res => res.json());
  }

  create(data: any): Observable<any> {
    const headers = new Headers();
    const body = JSON.stringify(data);

    headers.set('Content-Type', 'application/json');

    return this.http.post(this.url, body, {headers}).map(res => res.json());
  }

  update(data: any): Observable<any> {
    const headers = new Headers();
    const body = JSON.stringify(data);

    headers.set('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${data.id}`, body, {headers}).map(res => res.json());
  }

  delete(id: number): Observable<any> {
    const headers = new Headers();

    headers.set('Content-Type', 'application/json');

    return this.http.delete(`${this.url}/${id}`, {headers}).map(res => res.json());
  }

}
