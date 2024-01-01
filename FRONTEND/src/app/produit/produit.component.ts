import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Store } from '@ngxs/store';
import { AjouterAuPanier } from '../ngxs/states/panier.state';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent{

@Input() produit! : Produit;

constructor(private store : Store){}

ajouterAuPanier(produit : Produit){
  this.store.dispatch(new AjouterAuPanier(produit));
}

}
