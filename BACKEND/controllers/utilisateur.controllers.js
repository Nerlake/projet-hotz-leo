const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');
const filePath = path.join(__dirname, '/bouchon/utilisateurs.json');

const getUsersFromFile = () => {
  const usersData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(usersData);
};

// const addUserToFile = (user) => {
//   const users = getUsersFromFile();
//   users.push(user);
//   fs.writeFile(filePath, JSON.stringify(users), (err) => {
//     if (err) {
//       res.status(500).send({
//         message: err
//       });
//     } else {
//       res.send(user);
//     }
//   });
// }

// addUserToFile promise version
const addUserToFile = (user) => {
  return new Promise((resolve, reject) => {
    const users = getUsersFromFile();
    users.push(user);
    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}


function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

exports.register = (req, res) => {
  const newUser = {
    id: uuidv4(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password
  };
  
  const users = getUsersFromFile();
  const foundUser = users.find(user => user.login === newUser.login); // Correction ici pour utiliser le 'login'
  
  if (foundUser) {
    res.status(401).send({
      message: "Nom d'utilisateur déjà utilisé!"
    });
  } else {
    addUserToFile(newUser)
    .then(() => {
      this.login(req, res);
    })
      
  }
};
  



// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  
  const users = getUsersFromFile();
  const foundUser = users.find(user => user.login === utilisateur.login && user.password === utilisateur.password);
  if (foundUser) {

      const user = {
        id: foundUser.id,
        nom: foundUser.nom,
        prenom: foundUser.prenom,
        email: foundUser.email,
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
};


