const moment = require('moment');
const withdrawFundsManager = require('../data/managers/withdrawFundsManager');

exports.withdrawFundsController = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("inside controller id", id)

    let { amount } = req.body;
    // console.log("cnt", amount)

    const updatedCustomer = await withdrawFundsManager.withdrawFunds(id, amount);

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
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error Withdrawing Funds', error: err.message });
  }
};
