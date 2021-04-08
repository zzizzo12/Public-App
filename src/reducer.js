export const initialState = {
    panier: [],
    user: null
};

export const getTotalPanier = (panier) => panier?.reduce((total, item) => item.prix + total, 0);

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'AJOUTER_AU_PANIER':
            return {
                ...state,
                panier: [...state.panier, action.item]
            }
        case 'VIDER_PANIER':
            return {
                ...state,
                panier: []
            }
        case 'SUPPRIMER_DU_PANIER':
            const index = state.panier.findIndex(
                (panierItem) => panierItem.id == action.id
            );
            let nvPanier = [...state.panier];
            if (index >= 0) {
                nvPanier.splice(index, 1);

            } else {
                console.warn(`impossible de supprimer le produit (id: ${action.id}) on ne l'as pas trouvé dans votre panier`);
            }
            return {
                ...state,
                panier: nvPanier
            }
        case 'INIT_UTILISATEUR':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
};

export default reducer;