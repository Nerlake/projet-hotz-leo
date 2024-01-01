const fs = require('fs');

const getProductsFromFile = () => {
	const path = require('path');
	const filePath = path.join(__dirname, '/bouchon/produits.json');
	const usersData = fs.readFileSync(filePath, 'utf-8');
	return JSON.parse(usersData);
  };


exports.get = (req, res) => {

	const catalogue = getProductsFromFile();
		
	
	res.setHeader('Content-Type', 'application/json');
      
    res.send(catalogue);
};    


