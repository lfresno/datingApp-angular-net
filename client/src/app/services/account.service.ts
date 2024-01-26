import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);

  public baseUrl : string = 'https://localhost:5001/api';

  public loggedIn = signal(true);

  login( model : any){
    return this.http.post(`${this.baseUrl}/account/login`, model);
  }

  logout(){
    this.loggedIn.update(logged => false);
  }
}
