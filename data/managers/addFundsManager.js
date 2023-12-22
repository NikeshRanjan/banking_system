const Customer = require('../models/customerModel');

module.exports.addFund = (id, amount) => {
    return new Promise((resolve, reject) => {
        console.log("inside promise",amount)
        amount = Math.abs(Number(amount));
        Customer.findOne({ accNo: id })
            .then((response) => {
                const snapShotOfCurrentBalance = response.currentBalance + amount;
                console.log(snapShotOfCurrentBalance)

                Customer.findOneAndUpdate(
                    { accNo: id },
                    {
                        $inc: { currentBalance: amount },
                        $push: {
                            transctions: {
                                transctionType: 'Credit',
                                transctionDetails: {
                                    transferredFrom: "Self",
                                    transferredTo: "Self",
                                    balance: snapShotOfCurrentBalance,
                                    amount: amount
                                }
                            }
                        }
                    }
                )
                    .then((response) => {
                        console.log("jkl",response)
                        resolve(response);
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err)
                    })
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            });
    });
};