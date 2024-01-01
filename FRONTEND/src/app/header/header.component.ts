import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { PanierState } from '../ngxs/states/panier.state';
import { UserState } from '../ngxs/states/user.state';
import { Utilisateur } from '../models/utilisateur.model';
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Select(PanierState.getNbArticles) nbArticles$!: Observable<Number>;
  @Select(PanierState.areArticlesInPanier) areArticlesInPanier$!: Observable<boolean>;
  @Select(UserState.isConnected) isConnected$!: Observable<boolean>;
  @Select(UserState.getPrenom) prenom$!: Observable<Utilisateur>;

  isSubMenuOpen: boolean = false;
  nom : string = "Léo HOTZ";
  nomTP : string = "TP05"
  areArtclesInPanier : boolean = false;

  constructor(private store : Store, private connexionService: ConnexionService) { }

  ngOnInit() {
    this.areArticlesInPanier$.subscribe(areArticles => {
      this.areArtclesInPanier = areArticles;
    });
  }
  
  toggleSubMenu() : void{
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  deconnexion() : void {
    this.connexionService.deconnexion();
  }

}
