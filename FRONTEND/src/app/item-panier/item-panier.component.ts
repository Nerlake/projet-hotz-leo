import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Store } from '@ngxs/store';
import { SupprimerDuPanier } from '../ngxs/states/panier.state';

@Component({
  selector: 'app-item-panier',
  templateUrl: './item-panier.component.html',
  styleUrls: ['./item-panier.component.css']
})
export class ItemPanierComponent {

  @Input() produit! : Produit;

  constructor(private store : Store) { }

  supprimerDuPanier(){
    this.store.dispatch(new SupprimerDuPanier(this.produit));
  }


  quantite : number = 1;

}
