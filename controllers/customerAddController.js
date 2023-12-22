const moment = require('moment');
const customerAddManager = require('../data/managers/customerAddManager');
const validator = require('../lib/validator');

module.exports.customerAddController = async (req, res) => {
    try {
        // console.log(req.body);
        const params = req.body;
        let validationResult = validator.validateRegisterPayload(params);
        if (validationResult.error) {
            return res.status(400).json({ success: false, message: validationResult.error.details[0].message });
        }

        const payload = {
            name: params.name,
            email: params.email,
            address: params.address,
            dob: params.dob,
            phone: params.phone,
            currentBalance: params.currentBalance,
            gender: params.gender,
            accNo: req.params.id
            // transctions: params.transctions,

        }
        let newCustomer = await customerAddManager.addCustomer(payload);
        const createdAt = moment(newCustomer.createdAt).format('lll');
        const modifiedAt = moment(newCustomer.modifiedAt).format('lll');
        const dobFormatted = moment(newCustomer.dob).format('ll');

        res.status(201).json({
            success: true,
            data: {
                customer: newCustomer,
                createdAt,
                modifiedAt,
                dob: dobFormatted
            }
        });

    }
    catch (err) {
        res.status(500).json({ success: false,message: 'Error Adding customer', error: err.message });
    }

};