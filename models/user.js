const { Schema, model } = require("mongoose");
/*
This code defines a Mongoose schema for a user in a MongoDB database.It includes various fields such as name, email, password, address, phone number, isAdmin status, and a wishlist of products.The schema also sets default values, required fields, and defines references to other schemas. Finally,it creates an index on the email field and exports the User model for use in other parts of the codebase.
*/
const userSchema = Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, },
    passwordHash: { type: String, required: true },
    street: String,
    apartment: String,
    city: String,
    postalCode: String,
    country: String,
    phone: { type: String, trim: true, required: true },
    isAdmin: { type: Boolean, default: false },
    resetPasswordOtp: Number,
    resetPasswordOtpExpires: Date,
    wishlist: [{
        producId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        productName: { type: String, required: true },
        productImage: { type: String, required: true },
        productPrice: { type: Number, required: true },
    },
    ],
});

userSchema.index({ email: 1 }, { unique: true });

exports.User = model('User', userSchema);