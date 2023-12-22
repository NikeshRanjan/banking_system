// const transferFunds = require('../data/managers/transferFundsManager');

const addFundsManager = require('../data/managers/addFundsManager');
const transferFundsManager = require('../data/managers/transferFundsManager');

module.exports.transferFundsController = async (req, res) => {
  try {
    const senderId = req.params.id;
    const receiverId = req.body.receiverId;
    let { amount } = req.body;
    amount = Math.abs(Number(amount));

    const { sender, receiver } = await transferFundsManager.transferFunds(
      senderId,
      receiverId,
      amount
    );

    res.status(200).json({ success: true, data: { sender, receiver } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error Transferring Funds', error: err.message });
  }
};
