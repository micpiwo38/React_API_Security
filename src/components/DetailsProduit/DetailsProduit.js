import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailsProduit.css";
import deconnexion from "../../services/deconnexion";
import MenuGauche from "../MenuGauche/MenuGauche";
import axios from "axios";
import { useEffect } from "react";
export default function DetailsProduit() {
  //Recuperation de id de URL

  const { id } = useParams();
  const { nom_produit } = useParams();
  const [un_produit, setUnProduit] = useState("");
  const [produit_index, setProduitIndex] = useState(-1);

  const [nom_du_produit, setNomProduit] = useState("");
  const [description_produit, setDescriptionProduit] = useState("");
  const [image_produit, setImageProduit] = useState("");
  const [prix_produit, setPrixProduit] = useState(0);
  const [stock_produit, setStockProduit] = useState(true);
  const [date_produit, setDateProduit] = useState("");
  const [proprietaire, setProprietaire] = useState(0);

  const [produit_a_jour, setProduitMisJour] = useState(false);

  const [produit_supprimer, setProduitSupprimer] = useState(false);

  //la requete http get prend en paramètre id de l'utilisateur passer dans le tableau de produits
  const afficher_produits_par_utilisateur = () => {
    axios
      .get(
        `http://localhost:3001/produits?proprietaire=${id}&nom_produit=${nom_produit}`
      )
      .then((response) => {
        setUnProduit(...response.data);
        setProduitIndex(response.data);
        setNomProduit(un_produit);
      })
      .catch((erreur) => console.error(erreur));
  };

  useEffect(() => {
    afficher_produits_par_utilisateur();
    setProprietaire(id);
    //console.log(produit_index);
    //console.log(un_produit.id);
  }, []);

  const editer_produit = (e, id_produit) => {
    e.preventDefault();
    const remplacer_produit = {
      nom_produit: nom_du_produit,
      description_produit: description_produit,
      image_produit: image_produit,
      prix_produit: prix_produit,
      stock_produit: stock_produit,
      date_produit: date_produit,
      proprietaire: +proprietaire,
    };
    axios
      .put(`http://localhost:3001/produits/${id_produit}`, remplacer_produit)
      .then((response) => {
        setUnProduit({
          id: response.data.id,
          nom_produit: response.data.nom_du_produit,
          description_produit: response.data.description_produit,
          image_produit: response.data.image_produit,
          prix_produit: response.data.prix_produit,
          stock_produit: response.data.stock_produit,
          date_produit: response.data.date_produit,
          proprietaire: response.data.proprietaire,
        });
        setProduitMisJour(true);
        console.log(un_produit);
      })
      .catch((erreur) => console.error(erreur));
  };

  //Supprimer
  const supprimer_produit = (id_produit) => {
    //console.log(id_produit);
    axios
      .delete(`http://localhost:3001/produits/${id_produit}`)
      .then(() => {
        console.log("supprimer le produit");
        setProduitSupprimer(true);
      })
      .catch((erreur) => console.error(erreur));
  };

  //Supprimer le token du cache === deconnexion
  const deconnexion_utilisateur = () => {
    deconnexion();
  };

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
          {produit_supprimer ? (
            <div className="alert alert-success p-3">
              <h2 className="text-danger">Le produit a bien été supprimer !</h2>
              <a href={`/profile/${id}`} className="btn btn-info mt-3">
                Retour
              </a>
            </div>
          ) : (
            <>
              <div className="card p-3 w-50 m-auto mt-3">
                <img
                  width="50%"
                  className="img-fluid m-auto mt-3"
                  src={un_produit.image_produit}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="text-danger card-title">
                    {un_produit.nom_produit}
                  </h3>
                  <h5 className="card-title">Description :</h5>
                  <p className="card-text">{un_produit.description_produit}</p>

                  <a className="btn btn-info" href={`/profile/${id}`}>
                    Retour
                  </a>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => supprimer_produit(un_produit.id)}
                  >
                    Supprimer : ID: {un_produit.id}
                  </button>
                </div>
              </div>
              <div>
                {produit_a_jour ? (
                  <div className="alert alert-success p-3 mt-3">
                    <h2 className="text-danger">
                      Votre produit a bien été mis a jour !
                    </h2>
                    <a href={`/profile/${id}`} className="btn btn-success mt-3">
                      Retour
                    </a>
                  </div>
                ) : (
                  <div className="mt-3">
                    <h3 className="text-danger">
                      Editer le produit = {un_produit.id} -
                      {un_produit.nom_produit}
                    </h3>
                    <form onSubmit={(e) => editer_produit(e, un_produit.id)}>
                      <div className="mt-3">
                        <label htmlFor="nom_produit">Nom du produit</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={nom_du_produit}
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
                          onChange={(e) =>
                            setDescriptionProduit(e.target.value)
                          }
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
                        <label htmlFor="image_produit">
                          Prix du produit (€)
                        </label>
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
                        Mettre a jour
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
