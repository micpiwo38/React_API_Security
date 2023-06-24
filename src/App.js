import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Connexion from "./components/Connexion/Connexion";
import Profile from "./components/Profile/Profile";
import AjouterProduit from "./components/AjouterProduit/AjouterProduit";
import DetailsProduit from "./components/DetailsProduit/DetailsProduit";

function App() {
  const [est_connecter, setEstConnecter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setEstConnecter(!!token); //Convertis l'objet token du localstorage en bool
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route exact path="/" element={<Connexion />}></Route>
        <Route
          path="/profile/:id"
          element={est_connecter ? <Profile /> : <Connexion />}
        ></Route>
        <Route
          path="/profile/:id/ajouter-produit"
          element={est_connecter ? <AjouterProduit /> : <Connexion />}
        ></Route>
        <Route
          path="/profile/:id/details-produit/:nom_produit"
          element={est_connecter ? <DetailsProduit /> : <Connexion />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
