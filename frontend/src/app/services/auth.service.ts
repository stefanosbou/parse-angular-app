import {Injectable} from '@angular/core';
import Parse from 'parse';
import {BehaviorSubject, Observable} from "rxjs/index";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

// Initialize Parse
Parse.initialize(environment.PARSE_SERVER.APP_ID, environment.PARSE_SERVER.JS_KEY);
Parse.serverURL = environment.PARSE_SERVER.BASE_URL + environment.PARSE_SERVER.MOUNT_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn$: BehaviorSubject<boolean>;

    constructor(private router: Router) {
        this.loggedIn$ = new BehaviorSubject<boolean>(false);
    }

    isAuthenticated(): boolean {
        if (Parse.User.current()) {
            return true;
        } else {
            return false;
        }
    }

    // Login the user using credentials
    login(username, password) {
        return new Promise(async (resolve, reject) => {
            Parse.User.logIn(username, password).then(async (success) => {
                this.loggedIn$.next(true);
                this.router.navigateByUrl('');
                resolve();
            }, (err) => {
                console.log('Invalid credentials!', 'Login failed!');
                reject(err);
            });
        });
    }

    get isUserLoggedIn(): Observable<boolean> {
        this.loggedIn$.next(this.isAuthenticated());
        return this.loggedIn$;
    }

    // get the session token if there's a logged in user
    get getSessionToken(): string {
        let user = Parse.User.current();
        if (user) {
            return user.getSessionToken();
        } else {
            return '';
        }
    }

    // Logout user
    logout() {
        this.loggedIn$.next(false);
        Parse.User.logOut().then((res) => {
            this.router.navigateByUrl('');
        }, (err) => {
            console.log('Something went wrong!' + err.message);
        });
    }
}
