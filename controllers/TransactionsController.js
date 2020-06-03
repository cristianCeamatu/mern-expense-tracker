const Transaction = require("../models/Transaction");

const TransactionsCotroller = {
  //  @desc    Get all transactions
  //  @route  GET /api/v1/transactions
  //  @access Public
  async getTransactions(req, res, next) {
    try {
      const transactions = await Transaction.find();
      return res.json({
        success: true,
        count: transactions.length,
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  },

  //  @desc   Add a transactions
  //  @route  POST /api/v1/transactions
  //  @access Public
  async addTransaction(req, res, next) {
    try {
      return res.status(201).json({
        success: true,
        data: await Transaction.create(req.body),
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({
          success: false,
          error: messages,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Server error",
        });
      }
    }
  },

  //  @desc   Delete a transactions
  //  @route  DELETE /api/v1/transactions/:id
  //  @access Public
  async deleteTransaction(req, res, next) {
    try {
      const deletedTransaction = await Transaction.findByIdAndRemove(
        req.params.id
      );
      if (deletedTransaction) {
        return res.send({
          success: true,
          data: deletedTransaction,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "Bad request item not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: "Server error" });
    }
  },
};

module.exports = TransactionsCotroller;
