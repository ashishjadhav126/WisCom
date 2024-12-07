import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User>  {    
    let authHeaders: HttpHeaders = new HttpHeaders();
        authHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>('http://dummyjson.com/users/add',
    JSON.stringify(user),
    {
      headers:authHeaders,    
    })
  // )
  }
  updateUser(body:User) {
    let authheader :HttpHeaders = new HttpHeaders();
    authheader.set( 'Content-Type', 'application/json' )
    return this.http.put<User>('https://dummyjson.com/users/'+ body.id,
    JSON.stringify(body),{
      headers:authheader,
    }
  );
  }
  getUsers() : Observable<User[]> {
    return this.http.get<User[]>('http://dummyjson.com/users/')
  }
  deleteUser(rowstoBedeleted:any) {
   return this.http.delete<User>('https://dummyjson.com/users/'+rowstoBedeleted.id);
  }
}
