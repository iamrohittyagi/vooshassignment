const mongoose=require('mongoose');

// setup schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);

module.exports=User