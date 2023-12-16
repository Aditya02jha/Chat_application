const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        min:6,
        unique:true
    } 
    ,
    password:{
        type:String,
        required:true,
        min:8,
        max:24
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage :{
        type:String,
        default:""
    }

});

module.exports = mongoose.model('Users' , usersSchema);