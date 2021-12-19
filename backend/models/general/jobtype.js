const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const jobtypeSchema = new mongoose.Schema({
    jobname:{type:String},
    jobcode:{type:Number}    
    //affiliation:{type:ObjectId,ref:'Affiliation'},
});

const JobType = mongoose.model('JobType', jobtypeSchema);

module.exports = JobType;

