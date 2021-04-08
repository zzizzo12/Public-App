import React, { useState, useEffect } from 'react';
import { dataBase } from './firebase';
import './Ordres.css';
import { useStateValue } from './StateProvider';
import Ordre from './Ordre';

const Ordres = () => {
    const [{panier, user}, dispatch] = useStateValue();
    const [ordres, setOrdres] = useState([]);

    useEffect(() => {
        if (user) {
            dataBase.collection('users').doc(user?.uid).collection('ordres').orderBy('created', 'desc').onSnapshot(snapshot => (
                setOrdres(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }else {
            setOrdres([])
        }
    }, [user])

    return (
        <div className="ordres">
            <h1>Vos commandes ou ordres</h1>
            <div className="ordre_infos">
                {ordres?.map(ordre => (
                    <Ordre ordre={ordre} />
                ))}
            </div>
        </div>
    )
}

export default Ordres
