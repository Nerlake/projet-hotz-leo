// AuthGuardService.ts

import { Injectable } from '@angular/core';
import { Router, CanActivateChildFn } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, map, take } from 'rxjs';
import { PanierState } from '../ngxs/states/panier.state';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardBasket  {
    
  @Select(PanierState.getNbArticles) nbArticles$!: Observable<number>;
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.nbArticles$.pipe(
      take(1),
      map(nbArticles => {
        if (nbArticles > 0) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
