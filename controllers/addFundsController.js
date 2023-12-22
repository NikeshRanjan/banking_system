const moment = require('moment');
const addFundsManager = require('../data/managers/addFundsManager');

module.exports.addFundsController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("inside controller id", id)
        let { amount } = req.body;
        console.log("cnt", amount)
        const updatedCustomer = await addFundsManager.addFund(id, amount);
        if (!updatedCustomer) throw new Error('Sender not found')

        const createdAt = moment(updatedCustomer.createdAt).format('lll');
        const modifiedAt = moment(updatedCustomer.updatedAt).format('lll');
        const dobFormatted = moment(updatedCustomer.dob).format('ll');

        res.status(200).json({
            success: true,
            data: {
                customer: updatedCustomer,
                createdAt,
                modifiedAt,
                dob: dobFormatted,
            },
        });

        // res.redirect(`/customers/${id}`);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error Adding Funds', error: err.message });
      }
    
};