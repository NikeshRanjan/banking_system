const Customer = require('../models/customerModel')

module.exports.addCustomer = (payload) => {
    return new Promise((resolve, reject) => {
        Customer.create(payload)
            .then((data) => {
                resolve (data);
            })
            .catch((err) => {
                reject (err)
            });
    });
};