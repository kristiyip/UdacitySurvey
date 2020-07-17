const mongoose = require('mongoose');
// Same as const Schema = mongoose.Schema;
// Called destructuring
const { Schema } = mongoose;
const  RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    // Reference field. Sets up relationship between given schema
    // and given user
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent:  Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);