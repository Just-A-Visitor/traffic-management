import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Query1Service {
  uri = 'http://localhost:4004/query';

  constructor(private http: HttpClient) { }

  q1(aadhar) {
    const obj = {
      aadharNo:aadhar,
    };
    console.log(obj);
    this.http.post(`${this.uri}/work3`, obj)
        .subscribe(res => console.log('Done'));
  }
}