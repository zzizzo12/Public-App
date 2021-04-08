import React, {useState} from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const seConnecter = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then((auth) => {
            console.log(auth);
            if (auth) {
                history.push('/')
            }
        }).catch(error => alert(error.message))
    }

    const inscription = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            console.log(auth);
            if (auth) {
                history.push('/')
            }
        }).catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
            <img className='logo_login' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="" />
            </Link>
            <div className='login_infos'>
                <h1>Se connecter</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Mot de passe</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button className='cnx_btn' type='submit' onClick={seConnecter}>Se connecter</button>
                </form>
                <p>En vous connectant, vous acceptez les conditions d'utilisation de Zaid's AMAZON Clone, ainsi que ces condition de confidentialité </p>
                <button className='reg_btn' onClick={inscription}>Créer votre compte ici meme</button>
            </div>
            <div className="msg_log">
                si vous n'avez pas de compte, entrez un email et un mot passe et cliquez sur sur le button: Créer votre compte..., ensuite connectez vous :)
            </div>
        </div>
    )
}

export default Login
