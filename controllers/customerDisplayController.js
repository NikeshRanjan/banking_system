const moment = require('moment');
const customerDisplayManager = require('../data/managers/customerDisplayManager')


exports.customerDisplayController = async (req, res) => {
  try {
    const id = req.params.id;

    const customerData = await customerDisplayManager.getCustomerById(id);
    
    const createdAt = moment(customerData.createdAt).format('lll');
    const modifiedAt = moment(customerData.updatedAt).format('lll');
    const dob = moment(customerData.dob).format('ll');

    // const allCustomers = await customerDisplayManager.displayCustomerList(id);

    res.status(200).json({
      success: true,
      // allCustomers,
      customer: customerData,
      createdAt,
      modifiedAt,
      dob,
    });
  } 
    catch (err) {
      res.status(500).json({ success: false, message: 'Error Displaying Customer', error: err.message });
    }
  
};
