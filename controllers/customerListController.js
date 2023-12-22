const customerListManager = require('../data/managers/customerListManager');

module.exports.customerList = async (req, res) => {
    try {
        const allCustomers = await customerListManager.customerList({})
        res.status(200).json({ success: true, data: allCustomers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error Displaying Customer List', error: err.message });

    }
};