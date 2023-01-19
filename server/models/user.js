const mongoose =require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new  mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
     type:String,
     default:"https://res.cloudinary.com/sankalpn/image/upload/v1673252218/blank-profile-picture-g1f2d2a27e_1280_yx90e3.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema) // we give name user and pass the user Schema
                                  // Schema is nothing but the blueprint of data