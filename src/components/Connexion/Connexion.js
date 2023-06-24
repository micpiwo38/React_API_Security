import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Connexion.css";
import axios from "axios";
import Profile from "../Profile/Profile";
import Swal from "sweetalert2";

export default function Connexion() {
  //Etats
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState();
  const [est_connecter, setEstConnecter] = useState(false);

  //Methode de connexion appelée dans le rendu  dans la balise <form onSubmit></form>
  const formulaire_connexion = async (e) => {
    //Supprime le comportement par defaut de la validation du formulaire
    e.preventDefault();
    //Appel get de API + axios
    const response = await axios.get("http://localhost:3001/users");
    //Tous les utilisateurs
    const users = response.data;
    //Un utilisateur = find => javascript => email de api === e.target.value du champ email
    const user = users.find((user) => user.email === email);
    //Si email match
    if (user) {
      //On compare le password de api avec e.target.value du champs password
      if (user.password === password) {
        //On creer le token cle - valeur qui sera stocke dans le cache du navigateur via localStorage
        const token = JSON.stringify(user);
        //Id de user
        const user_id = user.id;
        //Creation du token cle - valeur
        localStorage.setItem("token", token);
        //On change l'etat du booleen a envoyé au parent App.js
        setEstConnecter(true);
        //On redirige vers le profile/:id
        window.location.href = `/profile/${user_id}`;
      } else {
        const erreur = Swal.fire("Le mot de passe est incorrect");
      }
    } else {
      const erreur = Swal.fire("L'utilisateur est inconnu !");
    }
  };

  return (
    <div className="container w-50 p-3 bg-danger rounded shadow mt-5">
      {est_connecter ? (
        <Profile />
      ) : (
        <div>
          <h2 className="taxt-info">CONNEXION</h2>
          <form onSubmit={formulaire_connexion}>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {erreur && <p>{erreur}</p>}
            <button className="btn btn-info mt-3" type="submit">
              Se connecter
            </button>
            <hr />
            <p>Vous êtes nouveau ?</p>
            <a href="/inscription" className="btn btn-primary">
              Inscription
            </a>
            <hr />
          </form>
        </div>
      )}
    </div>
  );
}
