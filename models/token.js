const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    refreshtoken: { type: String, required: true },
    accessToken: String,
    createdAt: { type: Date, default: Date.now, expires: 60 * 86400 },
});

exports.Token = model('Token', tokenSchema);