const transctionManager = require('../data/managers/displayTransctionsManager');

module.exports.displayTransction = async (req, res) => {
    try {
        const id = req.params.id;

        const displayedTransctions = await transctionManager.transctionManager(id)
        res.status(200).json({ success: true, data: displayedTransctions });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error Displaying Transctions', error: err.message });
      }
};
