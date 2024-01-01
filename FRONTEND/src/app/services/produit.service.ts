import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../ngxs/states/user.state';
import { switchMap } from 'rxjs/operators'; // Import 'switchMap' operator

@Injectable({
  providedIn: 'root'
})

export class ProduitService {

    @Select(UserState.getToken) token$!: Observable<string>;
    
    constructor(private httpClient: HttpClient, private store: Store) { }

    url: string = "https://tp-angular-backend-hotz-leo.onrender.com/api/catalogue"; 
    produits: Produit[] = [];

    getAllProduct(): Observable<Produit[]> {
      return this.token$.pipe(
        switchMap(token => {
          // Créer les en-têtes avec le token
          console.log(token);
          const headers = new HttpHeaders({
            'Authorization': `${token}`
          });

          // Passer les en-têtes dans la requête HTTP
          return this.httpClient.get<Produit[]>(this.url, { headers: headers });
        })
      );
    }    
}
