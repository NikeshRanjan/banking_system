const express = require('express');
const router = express.Router();



const { customerList } = require('../controllers/customerListController');
const { customerDisplayController } = require("../controllers/customerDisplayController");
const { displayTransction } = require('../controllers/displayTransctionsCOntroller')

const { addFundsController } = require('../controllers/addFundsController');
const { withdrawFundsController } = require('../controllers/withdrawFundsController');
const { transferFundsController } = require('../controllers/transferFundsController');

const { customerAddController } = require("../controllers/customerAddController");


router.get("/", customerList);
router.get("/:id", customerDisplayController);
router.get('/transctions/:id', displayTransction);


router.post('/addFunds/:id', addFundsController);
router.post('/withdrawFunds/:id', withdrawFundsController);
router.post('/transferFunds/:id', transferFundsController);

router.post("/", customerAddController);



module.exports = router;