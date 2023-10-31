import {Injectable} from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: AppUser[] = [];
  authenticatedUser : AppUser | undefined;

  constructor() {
    this.users.push({password: "1234", roles: ["USER"], username: "user1", userId: UUID.UUID()});
    this.users.push({password: "1234", roles: ["USER"], username: "user2", userId: UUID.UUID()});
    this.users.push({password: "1234", roles: ["USER", "ADMIN"], username: "admin", userId: UUID.UUID()});
  }

  public login(username: string, password: string): Observable<AppUser> {
    let appUser = this.users.find(u => u.username === username);
    if (!appUser) return throwError(() => new Error("user not found"));
    if (appUser.password != password) {
      return throwError(() => new Error("Bad Credentials"));
    }
    return of(appUser);
  }

  public authenticateUser(appUser : AppUser) :Observable<boolean>{
    this.authenticatedUser = appUser ;
    localStorage.setItem("auth-user" , JSON.stringify(
      {username:appUser.username ,
        roles : appUser.roles ,
        jwt : "JWT_TOKEN"
      }));
    return of(true);
  }

  public hasRole(role : string) : boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }

  public logout() : Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("auth-user");
    return of(true);
  }
}
