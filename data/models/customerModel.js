const mongoose = require('mongoose');

const transctionSchema = new mongoose.Schema({
    transctionType: {
        type: String,
    },
    transctionDetails: {
        transferredFrom: {
            type: String,
            default: ""
        },
        transferredTo: {
            type: String,
            default: ""
        },
        balance: {
            type: Number,
            default: 0
        },
        amount: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a customer name']
    },
    dob: {
        type: Date,
        required: [true, 'Please provide a Date of Birth']
    },
    gender: {
        type: String, 
        required: true,
        default: ''
    },
    address: {
        type: String,
        default: "India"
    },
    accNo: {
        type: String,
        required: true,
        default: new mongoose.Types.ObjectId
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    transctions: [transctionSchema],
    currentBalance: {
        type: Number,
        required: [true, 'Please provide a valid balance'],
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;