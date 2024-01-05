import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { PanierState } from '../ngxs/states/panier.state';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  @Select(PanierState.getArticles) panier$!: Observable<Produit[]>;
  @Select(PanierState.getPrixTotal) prixTotal$!: Observable<number>;

  imgSrc: string = "assets/cb.png";

}
