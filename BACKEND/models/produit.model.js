module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define("produit", {
  
     id: {
          type: Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement: true,
          allowNull: false
        },  
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },    
      image: {
          type: Sequelize.STRING,
      },
      prix: {
        type : Sequelize.DECIMAL(10,2),
      },
   });
  return Produit;
  };