const Customer = require('../models/customerModel');

module.exports.getCustomerById = (id) => {
    return new Promise((resolve, reject) => {
        Customer.findOne({ accNo: id })
            .then((customerData) => {
                resolve(customerData)
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

// module.exports.displayCustomerList = (id) => {
//     return new Promise((resolve, reject) => {
//         Customer.find(id)
//         .then((customerData) => {
//             resolve(customerData)
//         })
//         .catch(err => {
//             console.log(err);
//             reject(err);
//         });
//     });
// }