const mongoose = require("mongoose");
const { number } = require("zod");


mongoose.connect("mongodb+srv://carpediem55:Spidermannowayhome%4031@cluster0.n3wk9hj.mongodb.net/");

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type:String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('user',userSchema);

const AccountDetails = mongoose.model('accountDetails', accountSchema);
module.exports = ({
    User,
    AccountDetails
})