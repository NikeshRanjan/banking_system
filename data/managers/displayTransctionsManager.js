const Customer = require('../models/customerModel');

module.exports.transctionManager = (id) => {
    return new Promise((resolve, reject) => {
        Customer.findOne({accNo: id})
        .then((customer) => {
            resolve(customer)
        })
        .catch((err)=> {
            console.log(err)
            reject(err);
        })
    })
}