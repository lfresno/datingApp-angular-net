import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);

  baseUrl : string = environment.apiUrl;


  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMemeber( username : string) {
    return this.http.get<Member>(this.baseUrl + 'users/'+ username);
  }

  //ESTO LO HARÁ EL JWT Interceptor
  // getHttpOptions(){ //usamos el token del usuario
  //   const userString = localStorage.getItem('user');

  //   if(!userString) return;

  //   const user = JSON.parse(userString);
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer '+ user.token
  //     })
  //   }
  // }
}
