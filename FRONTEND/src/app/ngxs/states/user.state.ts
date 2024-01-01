import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { UserStateModel } from './user-state-model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { ViderPanier } from './panier.state';

export class AjouterUtilisateur{
    static readonly type = '[User] Ajouter utilisateur';
    constructor(public user: Utilisateur){}
}

export class SupprimerUtilisateur{
    static readonly type = '[User] Supprimer utilisateur';
    constructor(){}
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        utilisateur: []
    }
})


export class UserState {

    @Selector()
    static getUtilisateur(state: UserStateModel): Utilisateur{
        return state.utilisateur[0];
    }

    @Selector()
    static isConnected(state: UserStateModel): boolean{
        return state.utilisateur.length > 0;
    }

    @Selector()
    static getPrenom(state: UserStateModel): string{
        return state.utilisateur[0].prenom;
    }

    @Selector()
    static getToken(state: UserStateModel): string{
        return `Bearer ${state.utilisateur[0].token}`;
    }



    @Action(AjouterUtilisateur)
    ajouter({ getState, patchState }: StateContext<UserStateModel>, { user }: AjouterUtilisateur) {
        patchState({
            utilisateur: [user]
        });
    
        const state = getState(); // Obtenez le nouvel état après la modification
        console.log(state.utilisateur);
    }

    @Action(SupprimerUtilisateur)
    supprimer({ getState, patchState }: StateContext<UserStateModel>, { }: SupprimerUtilisateur) {
        const state = getState();
        patchState({
          utilisateur: []
        });
      }
}
