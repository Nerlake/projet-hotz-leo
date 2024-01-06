
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const bcrypt = require("bcrypt");
const Utilisateur = db.utilisateur;

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

exports.register = (req, res) => {
  const newUser = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password
  };

  Utilisateur.findOne({ where: { login: newUser.login } })
    .then(data => {
      if (data) {
        res.status(401).send({
          message: "Nom d'utilisateur déjà utilisé!"
        });
      }
      else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        Utilisateur.create(newUser)
        .then(data => {
          const user = {
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
           };
              
          let accessToken = generateAccessToken(user);
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          user.token = accessToken;

          console.log (accessToken);
          res.send(user);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nom d'utilisateur déjà utilisé!"
      });
    }
  );
};
  

exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // compare password with hash

  Utilisateur.findOne({ where: { login: utilisateur.login } })
  .then(data => {
    var passwordIsValid = bcrypt.compareSync(utilisateur.password, data.password);
    if (passwordIsValid) {
      const user = {
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
       };
        
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        user.token = accessToken;

        console.log (accessToken);


      
        res.send(user);
    }    
    else{
      res.status(401).send({
        message: "Nom d'utilisateur ou mot de passe incorrect!"
      });
    }   
  }
  )
  .catch(err => {
    res.status(500).send({
      message: "Nom d'utilisateur ou mot de passe incorrect!"
    });
  });

};


