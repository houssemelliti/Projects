import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private RequestMethod = {
    get: 'get',
    put: 'put',
    post: 'post',
    delete: 'delete'
  }
  private baseUrl = environment.apiUrl;

  constructor(public http: HttpClient, private auth: AuthService) { }

  get(url: string) {
    return this.request(url, this.RequestMethod.get);
  }

  post(url: string, body: any) {
    return this.request(url, this.RequestMethod.post, body);
  }

  put(url: string, body: any) {
    return this.request(url, this.RequestMethod.put, body);
  }

  delete(url: string) {
    return this.request(url, this.RequestMethod.delete);
  }

  request(url: string, method: string, body?: any) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.request<any>(method, `${this.baseUrl}/${url}`,{headers: headers, body: body? body: null});
  }
}
