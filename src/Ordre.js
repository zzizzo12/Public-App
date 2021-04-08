import React from 'react'
import CheckoutProduit from './CheckoutProduit'
import './Ordre.css';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

const Ordre = ({ ordre }) => {
    return (
        <div className="ordre">
            <h2>Commandes</h2>
            <p>{moment.unix(ordre.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="ordre_id">
                <small>{ordre.id}</small>
            </p>
            {ordre.data.panier?.map(item => (
                <CheckoutProduit 
                  id={item.id}
                  description={item.description}
                  prix={item.prix}
                  image={item.image}
                  note={item.note}
                  hideButton
               />
            ))}
            <CurrencyFormat 
                 renderText={(value) => (
                        <h3 className="total_ordre">Total commande: {value}</h3>
                 )}
                 decimalScale={2}
                 value={ordre.data.amount / 100}
                 displayType={"text"}
                 thousandSeparator={true}
                 prefix={"$"}
            />
        </div>
    )
}

export default Ordre
