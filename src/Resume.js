import React from 'react';
import './Resume.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getTotalPanier } from './reducer';
import { useHistory } from 'react-router-dom';

const Resume = () => {

    const history = useHistory();

    const [{ panier }, dispatch] = useStateValue();
    
    return (
        <div className="resume">
            <CurrencyFormat 
                 renderText={(value) => (
                     <>
                        <p>
                            Total ({panier?.length} produit): <strong>{value}</strong>
                        </p>
                        <small className="sub_cadeaux">
                            <input type="checkbox" /> cet ordre contient des cadeaux
                        </small>
                     </>
                 )}
                 decimalScale={2}
                 value={getTotalPanier(panier)}
                 displayType={"text"}
                 thousandSeparator={true}
                 prefix={"$"}
            />
            <button onClick={e => history.push('/payement')}>Proceder au Payment</button>
        </div>
    )
}

export default Resume;
