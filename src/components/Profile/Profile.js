import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuGauche from "../MenuGauche/MenuGauche";
import Swal from "sweetalert2";
import deconnexion from "../../services/deconnexion";

export default function Profile() {
  //Etats
  //Recuperation de id de URL
  const { id } = useParams();
  const { proprietaire } = useParams();
  //Recuperation des utilisateurs

  //Recuperation des produits
  const [produits, setProduits] = useState([]);
  const [un_produit, setUnProduit] = useState();
  const [produit_index, setProduitIndex] = useState(-1);
  //Actions

  //la requete http get prend en paramètre id de l'utilisateur passer dans le tableau de produits
  const afficher_produits_par_utilisateur = () => {
    axios
      .get(`http://localhost:3001/produits?proprietaire=${id}`)
      .then((response) => {
        setProduits(response.data);
        console.log(response.data);
      })
      .catch((erreur) => console.error(erreur));
  };

  //Afficher les details d'un produit
  const affiche_details_produit = (produit, index) => {
    axios
      .get(
        `http://localhost:3001/produits?proprietaire=${proprietaire}&id_produit=${id}`
      )
      .then((response) => {
        setUnProduit(produit);
        setProduitIndex(index);
        Swal.fire({
          title: produit.nom_produit,
          imageUrl: produit.image_produit,
          html:
            produit.description_produit +
            "<hr>" +
            "PRIX :" +
            produit.prix_produit +
            " €" +
            "<hr>" +
            "Date de depôt : " +
            produit.date_produit,
          showCloseButton: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          confirmButtonText: "Ajouter au panier",
        });
      });
  };

  //Supprimer le token du cache === deconnexion
  const deconnexion_utilisateur = () => {
    deconnexion();
  };

  //Lorsque le composant est monté
  useEffect(() => {
    afficher_produits_par_utilisateur();
  }, []);

  //Rendu
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <button
            onClick={deconnexion_utilisateur}
            className="btn btn-info mt-3"
          >
            Deconnexion
          </button>
          <MenuGauche />
        </div>
        <div className="col-md-9 col-sm-12">
          <h2 className="text-warning">TABLEAU DE BORD</h2>
          <hr />
          <a
            href={`/profile/${id}/ajouter-produit`}
            className="btn btn-outline-info"
          >
            Ajouter un produit
          </a>
          <hr />
          <h3 className="text-success">Vos produits : </h3>
          {produits &&
            produits.map((produit, index) => (
              <div key={index} className="card p-3 w-50 m-auto mt-3">
                <img
                  width="50%"
                  className="img-fluid m-auto mt-3"
                  src={produit.image_produit}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="text-danger card-title">
                    ID : {produit.id} - {produit.nom_produit}
                  </h3>
                  <h5 className="card-title">Description :</h5>
                  <p className="card-text">{produit.description_produit}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => affiche_details_produit(produit, index)}
                  >
                    Plus d'infos
                  </button>
                  <a
                    className="btn btn-warning mx-3"
                    href={`/profile/${id}/details-produit/${produit.nom_produit}`}
                  >
                    Editer le produit
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
