import React from "react";
import "./Checkout.css";
import CheckoutProduit from "./CheckoutProduit";
import Resume from './Resume';
import { useStateValue } from "./StateProvider";

const Checkout = () => {

    const [{ panier, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_details">
        <img
          className="checkout_imag"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
            <h3>Salut, {user?.email}</h3>
            <h2 className="checkout_annoce">Votre pannier</h2>
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
      <div className="checkout_resume">
          <Resume />
      </div>
    </div>
  );
};

export default Checkout;
