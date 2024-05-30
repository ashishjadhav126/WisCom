import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { User } from '../type';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private authToken: any = '';
    private currentUser = { username: '' };
    private authSecretKey = 'Bearer Token';
    private isAuthenticated = false;
    public isLoggedIn: Subject<any> = new Subject();

    constructor(private http: HttpClient,
        private router: Router,
    ) {
        this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
        if (this.isAuthenticated) {
            this.authToken = localStorage.getItem(this.authSecretKey);
        }
    }

    resetAuthDetails() {
        this.authToken = '';
        this.currentUser = { username: '' };
        localStorage.removeItem(this.authSecretKey);
    }

    // modify the return type to properly use the full response
    login(username: string, password: string): Observable<User> {
        let authHeaders: HttpHeaders = new HttpHeaders();
        authHeaders.set('Content-Type', 'application/json');
        // implement here
        const body = 
            {
                username: username,
                password: password,
                expiresInMins: 30,
              }
        
        return new Observable((subscribe) => {
            this.http
                .post<User>(
                    'https://dummyjson.com/auth/login',
                    body,
                    {
                        headers: authHeaders,
                    }
                ).subscribe({
                    next: (value: User) => {
                                if (value && value.token) {
                                    this.authToken = value.token;
                                    localStorage.setItem(this.authSecretKey, this.authToken);
                                    sessionStorage.setItem('userDetail', username);
                                    this.currentUser = { username: username };
        
                                    subscribe.next('SUCCESS'as any);
                                    this.isLoggedIn.next(true);
                                    subscribe.complete();
                                } else {
                                    subscribe.next('FAILURE' as any);
                                    subscribe.complete();
                                }
                            },
                    error: (e: any) => {console.error(e);
                        this.resetAuthDetails();
                    },
                    complete: () => console.info('complete')
                  });
                
    });
}

    isAuthenticatedUser(): boolean {
        return this.authToken && !!localStorage.getItem(this.authSecretKey);
    }

    getAuthToken() {
        return this.authToken;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}
