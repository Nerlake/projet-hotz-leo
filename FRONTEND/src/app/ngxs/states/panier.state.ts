import { Produit } from 'src/app/models/produit.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PanierStateModel } from './panier-state-model';

export class AjouterAuPanier{
    static readonly type = '[Panier] Ajouter au panier';
    constructor(public produit: Produit){}
}

export class SupprimerDuPanier{
    static readonly type = '[Panier] Supprimer du panier';
    constructor(public produit: Produit){}
}

export class ViderPanier{
    static readonly type = '[Panier] Vider le panier';
    constructor(){}
}

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})


export class PanierState {
    @Selector()
    static getArticles(state: PanierStateModel): Produit[]{
        console.log(state.panier);
        return state.panier;
    }

    static areArticlesInPanier(state: PanierStateModel): boolean{
        return state.panier.length > 0;
    }

    @Selector()
    static getNbArticles(state: PanierStateModel) : number{
        return state.panier.length;
    }

    @Selector()
    static getPrixTotal(state: PanierStateModel) : number{
        let prixTotal = 0;
        state.panier.forEach(produit => {
            prixTotal += produit.prix;
        });
        return prixTotal;
    }

    @Action(AjouterAuPanier)
    ajouter({ getState, patchState }: StateContext<PanierStateModel>, { produit }: AjouterAuPanier) {
        const state = getState();
        if(state.panier.find(item => item.id === produit.id)){
            console.log("Produit déjà dans le panier");
        }
        else{
            patchState({
              panier: [...state.panier, produit]
            });            
        }
      }

    @Action(SupprimerDuPanier)
    supprimer({ getState, patchState }: StateContext<PanierStateModel>, { produit }: SupprimerDuPanier) {
        const state = getState();
        patchState({
          panier: state.panier.filter((item) => item.id !== produit.id)
        });
      }

    @Action(ViderPanier)
    vider({ getState, patchState }: StateContext<PanierStateModel>, { }: ViderPanier) {
        const state = getState();
        patchState({
          panier: []
        });
      }
}
