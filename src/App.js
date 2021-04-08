import React, { useEffect } from 'react';
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payement from './Payement';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Ordres from './Ordres';

const promise = loadStripe('pk_test_51I88sgBQ4q0jfnmBhEw3T3i4dwkjU9Q4sXiu1iAcYPe38M7IVoZSgyerS8ea1SW7x0QBq21Ngu05OS7o7OVWHJ1400AOfU6sKJ');

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'INIT_UTILISATEUR',
          user: authUser
        })
      } else {
        dispatch({
          type: 'INIT_UTILISATEUR',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/ordres">
            <Header />
            <Ordres />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payement">
            <Header />
            <Elements stripe={promise}>
               <Payement />
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
