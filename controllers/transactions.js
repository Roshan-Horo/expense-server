const Transaction = require('../models/Transaction');

// @desc Get all Transactions
// @route GET /api/transactions
// @access PUBLIC
exports.getTransactions = async (req,res,next) => {
    try {
        const transaction = await Transaction.find();
       
        return res.status(200).json({
            success: true, 
            count: transaction.length,
            data: transaction
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add Transactions
// @route POST /api/transactions
// @access PUBLIC
exports.addTransactions = async (req,res,next) => {
    try {
        const { text, amount}  = req.body;

        const transaction = await Transaction.create(req.body);
    
        return res.status(200).json({
            success: true,
            data: transaction
        }); 
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }else{
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        }
    }
        
 
}

// @desc delete Transactions
// @route DELETE /api/transactions/:id
// @access PUBLIC
exports.deleteTransactions = async (req,res,next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {} 
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    } 
}