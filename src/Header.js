import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import logo from "./logos/amzon_logo.png";
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';

const Header = () => {
  const [{ panier, user }, dispatch] = useStateValue();

  const siConnecte = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={logo} />
      </Link>

      <div className="header_search">
        <input className="headerS_input" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && '/login'}>
          <div className="header_option" onClick={siConnecte}>
            <span className="header_option_1">Salut, {user ? user.email : 'Client'}</span>
            <span className="header_option_2">{user ? 'Se deconnecter' : 'Se connecter'}</span>
          </div>
        </Link>
        <Link to="/ordres">
             <div className="header_option">
               <span className="header_option_1">Retours</span>
               <span className="header_option_2">& Ordres</span>
             </div>
        </Link>
        <div className="header_option">
          <span className="header_option_1">Votre</span>
          <span className="header_option_2">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasket />
            <span className="header_option_2 header_basketCount">
              {panier?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
