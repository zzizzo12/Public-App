import React from 'react';
import './Produit.css';
import { useStateValue } from './StateProvider';

const Produit = ({ id, description, image, prix, note }) => {

    const [{ panier }, dispatch] = useStateValue();
    console.log(panier)

    const ajouterAuPanier = () => {
        dispatch({
            type: 'AJOUTER_AU_PANIER',
            item: {
                id: id,
                description: description,
                image: image,
                prix: prix,
                note: note,
            },
        });
    };

    return (
        <div className="produit">
            <div className="produit_info">
                <p>{description}</p>
                <p className="produit_prix">
                    <small>$</small>
                    <strong>{prix}</strong>
                </p>
                <div className="produit_notes">
                    {Array(note).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={ajouterAuPanier}>Ajouter au panier</button>
        </div>
    );
}

export default Produit;
