// AuthGuardService.ts

import { Injectable } from '@angular/core';
import { Router, CanActivateChildFn } from '@angular/router';
import { Select } from '@ngxs/store';
import { UserState } from '../ngxs/states/user.state';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard  {
    
 @Select(UserState.isConnected) isConnected$!: Observable<boolean>;
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.isConnected$.pipe(
      take(1), 
      map(isConnected => {
        if (isConnected) {
          return true; 
        } else {
          this.router.navigate(['/connexion']); 
          return false;
        }
      })
    );
  }
}
