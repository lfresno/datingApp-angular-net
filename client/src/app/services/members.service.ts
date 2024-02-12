import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);

  baseUrl : string = environment.apiUrl;
  members : Member[] = [];


  getMembers(){
    //si ya tenemos los usuarios guardados, no hace falta que se los pidamos a la api (tarda más)
    if(this.members.length > 0) return of(this.members);

    return this.http.get<Member[]>(this.baseUrl + 'users')
      .pipe(
        map(members => {
          this.members = members;
          return members;
        })
      )
  }

  getMemeber( username : string) {
    const member = this.members.find( x => x.userName === username);
    if(member) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/'+ username);
  }

  updateMember(member : Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member};
      })
    )
  }

  setMainPhoto(photoId : number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId : number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
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
