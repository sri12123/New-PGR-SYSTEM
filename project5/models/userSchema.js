//jshint esversion:6
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:"string",
      
        required:true
    },
    lastName:{
        type:"string",
      
        required:true
    },
    username:{
        type:"string",
        
        required:true
    },
    password:{
        type:"string",
      
        required:true
    },
    mobile:{
        type:"Number",
       
        required:true
    },
    typeOfPerson:{
        type:"string",
        default:'none',
        required:true
    }

});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('userModel',userSchema);