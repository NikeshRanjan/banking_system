const Customer = require('../models/customerModel');

module.exports.customerList = () => {
    return new Promise((resolve, reject) => {
        Customer.find({}).sort('name')
        .then((customerData) => {
            resolve (customerData)
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
};