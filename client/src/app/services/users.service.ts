import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  private http = inject(HttpClient);

  public users? : any;

  constructor() {

    console.log('Hola desde el servicio');

    this.http.get('https://localhost:5001/api/users')
      .subscribe({
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log('Request completed')
      });
  }
}
