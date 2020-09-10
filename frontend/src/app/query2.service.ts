import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Query2Service {
  uri = 'http://localhost:4003/query2';

  constructor(private http: HttpClient) { }

  q2(id) {
    const obj = {
      id: id,
    };
    console.log(obj);
    this.http.post(`${this.uri}`, obj)
      .subscribe(res => console.log('Done'));
  }
}