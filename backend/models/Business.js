const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Business = new Schema({
    personId : {type:Number},
    vehicleNo : {type:Number},
    date : {type:String},
    policeId : {type:Number},
    licenseNo : {type:Number},
    time : {type:String},
    pincode :{type:Number},
    injuries : {type:String},
    roadType : {type:String},
    weatherStatus : {type:String},
    report :{type:String},
    violationNo : {type:Number},
    crimeCode : {type:Number},
    area : {type:String},
},{
    collection: 'violation'
});

module.exports = mongoose.model('Business', Business);
