import {Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CheckoutProduit from './CheckoutProduit';
import './Payement.css'
import { useStateValue } from './StateProvider';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getTotalPanier } from './reducer';
import axios from './axios';
import {dataBase} from './firebase';

const Payement = () => {

    const [{panier, user}, dispatch] = useStateValue();

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);

    const [succesed, setSuccesed] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
      const getClientSecret = async () => {
        const response = await axios({
          method: 'post',
          // car stipe prends les centieme de la devise comme unité
          url: `/payments/create?total=${getTotalPanier(panier) * 100}`
        });
        setClientSecret(response.data.clientSecret)
      }
      getClientSecret();
    },[panier])

    console.log('the secret is -->', clientSecret)

    const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }).then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        
        // reach db collection users to user to order and create document with paymId and the infos in (panier,amount..)
        dataBase.collection('users').doc(user?.uid).collection('ordres').doc(paymentIntent.id).set({
          panier: panier,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

        setSuccesed(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'VIDER_PANIER'
        })

        history.replace('/ordres')
      })
    };

    const handleChange = e => {
      setDisable(e.empty);
      setError(e.error ? e.error.message : "");
    };

    return (
      <div className="payement">
        <div className="payement_infos">
            <h1>
                Checkout (<Link to="/checkout">{panier?.length} produits</Link>)
            </h1>

            {/* les infos de l'adresse */}
          <div className="section_pay">
            <div className="titre_payement">
              <h3>adresse de livraison</h3>
            </div>
            <div className="adr_payement">
              <p>{user?.email}</p>
              <p>404 React-firebase Avenue</p>
              <p>CASABLANCA, HAY EL MERNISI, RC</p>
            </div>
          </div>

          {/* la section de payement et revue des produit acheté */}
          <div className="section_pay">
            <div className="titre_payement">
              <h3>Revue des Produits et Livraison</h3>
            </div>
            <div className="item_payement">
                {panier.map(item => (
                    <CheckoutProduit 
                       id={item.id}
                       description={item.description}
                       prix={item.prix}
                       image={item.image}
                       note={item.note}
                    />
                  ))}
            </div>
          </div>

          {/* section payement et méthodes de payement */}
          <div className="section_pay">
              <div className="titre_payement">
                 <h3>Méthodes de payement</h3>
              </div>
              <div className="meth_payement">
                  <h3 className="titre_inf_banc">Informations bancaires</h3>

                  <form onSubmit={handleSubmit}>
                    <CardElement className="visa" onChange={handleChange}/>
                    <div className="infos_prix">
                        <CurrencyFormat 
                             renderText={(value) => (
                                    <h3>Total: {value}</h3>
                             )}
                             decimalScale={2}
                             value={getTotalPanier(panier)}
                             displayType={"text"}
                             thousandSeparator={true}
                             prefix={"$"}
                        />
                        <button className="btn_achat" disabled={processing || disable || succesed}>
                          <span>{processing ? <p>En traitement</p> : "Achetez"}</span>
                        </button>
                    </div>
                    {error && <div>{error}</div>}
                  </form>
              </div>
          </div>

        </div>
      </div>
    );
}

export default Payement;
