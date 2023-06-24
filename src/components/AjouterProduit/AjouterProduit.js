import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AjouterProduit.css";

import deconnexion from "../../services/deconnexion";
import MenuGauche from "../MenuGauche/MenuGauche";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AjouterProduit() {
  //Id contenu dans url apres connexion
  const { id } = useParams();
  console.log(id);
  //Init de l'objet a ajouter

  //Etats
  const [nom_produit, setNomProduit] = useState("");
  const [description_produit, setDescriptionProduit] = useState("");
  const [image_produit, setImageProduit] = useState("");
  const [prix_produit, setPrixProduit] = useState(0);
  const [stock_produit, setStockProduit] = useState(true);
  const [date_produit, setDateProduit] = useState("");
  const [proprietaire, setProprietaire] = useState(0);

  const [produit_ajouter, setProduitAjouter] = useState(false);

  const [produit, setProduit] = useState();

  //Actions
  useEffect(() => {
    console.log(id);
    setProprietaire(id);
  });
  //Deconnexion
  const deconnexion_utilisateur = () => {
    deconnexion();
  };

  //Ajouter un produit
  const ajouter_produit = (e) => {
    e.preventDefault();
    const ajouter_produit = {
      nom_produit: nom_produit,
      description_produit: description_produit,
      image_produit: image_produit,
      prix_produit: prix_produit,
      stock_produit: stock_produit,
      date_produit: date_produit,
      proprietaire: +proprietaire,
    };
    axios
      .post(`http://localhost:3001/produits`, ajouter_produit)
      .then((response) => {
        if (
          (response && response.data.nom_produit === "") ||
          response.data.description_produit === "" ||
          response.data.image_produit === "" ||
          response.data.prix_produit === "" ||
          response.data.date_produit === ""
        ) {
          Swal.fire("Merci de remplir tous les champs du fomulaire !");
          return;
        } else {
          setProduit({
            id: response.data.id,
            nom_produit: response.data.nom_produit,
            description_produit: response.data.description_produit,
            image_produit: response.data.image_produit,
            prix_produit: response.data.prix_produit,
            stock_produit: response.data.stock_produit,
            date_produit: response.data.date_produit,
            proprietaire: response.data.proprietaire,
          });
          setProduitAjouter(true);
        }
      })
      .catch((erreur) => console.error(erreur));
  };
  //Rendus

  return (
    <div className="container p-3">
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
          {produit_ajouter ? (
            <div className="alert alert-success p-3">
              <h2 className="text-danger">
                Votre produit a été ajouter avec succès !{" "}
              </h2>
              <a href={`/profile/${id}`} className="btn btn-info mt-2">
                Retour au tableau de bord
              </a>
            </div>
          ) : (
            <div>
              <h3 className="text-info">Ajouter un produit</h3>
              <form onSubmit={ajouter_produit}>
                <div className="mt-3">
                  <label htmlFor="nom_produit">Nom du produit</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={nom_produit}
                    onChange={(e) => setNomProduit(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="description_produit">
                    Description du produit
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={description_produit}
                    onChange={(e) => setDescriptionProduit(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="image_produit">URL du produit</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={image_produit}
                    onChange={(e) => setImageProduit(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="image_produit">Prix du produit (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="form-control"
                    value={prix_produit}
                    onChange={(e) => setPrixProduit(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <input
                    type="hidden"
                    className="form-control"
                    value={stock_produit}
                    onChange={(e) => setStockProduit(true)}
                  />
                </div>

                <div className="mt-3">
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={date_produit}
                    onChange={(e) => setDateProduit(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <input
                    type="hidden"
                    className="form-control"
                    value={proprietaire}
                    onChange={(e) => setProprietaire(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-success mt-3">
                  Ajouter
                </button>
                <hr />
                <a href={`/profile/${id}`} className="btn btn-danger">
                  Annuler
                </a>
                <hr />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
