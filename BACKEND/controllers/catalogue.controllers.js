const db = require("../models");
const Produit = db.produit;

exports.get = async (req, res) => {
  try {
    const catalogue = await getProductsFromDB();

    if (!catalogue || catalogue.length === 0) {
      res.status(404).send({
        message: "Catalogue non trouvé"
      });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(catalogue);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération du catalogue :", error);
    res.status(500).send({
      message: "Erreur lors de la récupération du catalogue"
    });
  }
};

async function getProductsFromDB() {
  try {
    const products = await Produit.findAll();
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits depuis la base de données :", error);
    throw error; // Renvoie l'erreur pour la gérer dans la fonction appelante
  }
}
