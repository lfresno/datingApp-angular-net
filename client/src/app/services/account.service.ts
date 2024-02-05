import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private router = inject(Router);

  public baseUrl : string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable(); //el símbolo $ en una variable indica que es un observable.

  public loggedIn = signal(true);

  login( model : any){
    return this.http.post<User>(`${this.baseUrl}account/login`, model)
      .pipe(
        map( (response : User) => {
          const user : User = response;
          if(user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
    }

    register(model : any){
      return this.http.post<User>(`${this.baseUrl}account/register`, model)
        .pipe(
          map( (response : User) => {
            const user : User = response;
            if(user){
              localStorage.setItem('user', JSON.stringify(user));
              this.currentUserSource.next(user);
            }
            return user;
          })
        );
    }

  setCurrentUser( user : User){
    this.currentUserSource.next(user);
  }

  isLoggedIn( logged : boolean){
    this.loggedIn.update( log => logged);
  }

  logout(){
    this.loggedIn.update(logged => false);

    localStorage.removeItem('user');
    this.currentUserSource.next(null);

    this.router.navigate(['/home']);
  }
}
