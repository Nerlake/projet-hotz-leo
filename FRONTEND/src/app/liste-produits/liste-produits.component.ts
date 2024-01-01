import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/searchbar.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit, OnDestroy {
  titre: string = "Liste des produits...";
  produits: Produit[] = []; 
  filteredProduits: Produit[] = [];
  searchSubscription!: Subscription; 

  constructor(
    private produitsService: ProduitService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.produitsService.getAllProduct().subscribe({
      next: (data) => {
        this.produits = data; 
        this.filteredProduits = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    });

    this.searchSubscription = this.searchService.searchObservable.subscribe(searchTerm => {
      this.filterProducts(searchTerm);
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }


  private filterProducts(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredProduits = this.produits;
    } else {
      this.filteredProduits = this.produits.filter(produit =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
