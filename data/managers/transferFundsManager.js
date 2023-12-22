const Customer = require('../models/customerModel');

module.exports.transferFunds = (senderId, receiverId, amount) => {
    return new Promise((resolve, reject) => {
        Customer.findOne({ accNo: senderId })
            .then((sender) => {
                return Customer.findOne({ accNo: receiverId })
                    .then((receiver) => {
                        const senderName = sender.name;
                        const receiverName = receiver.name;

                        const snapshotOfSenderBalance = sender.currentBalance - amount;
                        if (snapshotOfSenderBalance < 0) {
                            reject(new Error('Insufficient Funds!'))
                        }
                        Promise.all([
                            Customer.findOneAndUpdate(
                                { accNo: senderId },
                                {
                                    $inc: { currentBalance: -amount },
                                    $push: {
                                        transctions: {
                                            transctionType: "Debit",
                                            transctionDetails: {
                                                transferredFrom: "Self",
                                                transferredTo: receiverName,
                                                balance: snapshotOfSenderBalance,
                                                amount: amount,
                                            },
                                        },
                                    },
                                },
                                { new: true }
                            ),
                            Customer.findOneAndUpdate(
                                { accNo: receiverId },
                                {
                                    $inc: { currentBalance: amount },
                                    $push: {
                                        transctions: {
                                            transctionType: "Credit",
                                            transctionDetails: {
                                                transferredFrom: senderName,
                                                transferredTo: "Self",
                                                balance: receiver.currentBalance + amount,
                                                amount: amount,
                                            },
                                        },
                                    },
                                },
                                { new: true }
                            )
                        ])
                            .then(([updatedSender, updatedReceiver]) => {
                                resolve({ sender: updatedSender, receiver: updatedReceiver })
                            })
                            .catch((err) => {
                                reject(err)
                            });
                    });
            });
    });
};