import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  url = 'http://localhost:8080/api/categories';

  constructor(private http: Http) {}

  getList(): Observable<any> {
    return this.http.get(this.url).map(res => res.json());
  }

  create(data): Observable<any> {
    const headers = new Headers();
    const body = JSON.stringify(data);

    headers.set('Content-Type', 'application/json');

    return this.http.post(this.url, body, {headers}).map(res => res.json());
  }

  delete(id: number): Observable<any> {
    const headers = new Headers();

    headers.set('Content-Type', 'application/json');

    return this.http.delete(`${this.url}/${id}`, {headers}).map(res => res.json());
  }

}
