//Supprimer le token du cache === deconnexion
const deconnexion = () => {
  //Supprimer le token du cache
  localStorage.removeItem("token");
  //redirection vers la page de connexion
  window.location.href = "/";
};

export default deconnexion;
