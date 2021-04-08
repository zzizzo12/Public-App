import React from 'react';
import './CheckoutProduit.css'
import { useStateValue } from './StateProvider';

const CheckoutProduit = ({ id, description, prix, image, note, hideButton }) => {

    const [{ panier }, dispatch] = useStateValue();

    const supprimerDuPanier = () => {
            dispatch({
                type: 'SUPPRIMER_DU_PANIER',
                id: id,
            })
    }

    return (
        <div className="checkout_produit">
            <img className="checkout_prd_image" src={image} alt="" />
            <div className="checkout_prd_info">
                <p className="checkout_prd_desc">{description}</p>
                <p className="checkout_prd_prix">
                    <small>$</small>
                    <strong>{prix}</strong>
                </p>
                <div className="checkout_prd_note">
                       {Array(note).fill().map((_, i) => (
                            <p>⭐</p>
                       ))}
                </div>
                {!hideButton && (
                  <button onClick={supprimerDuPanier}>Supprimer du panier</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduit
