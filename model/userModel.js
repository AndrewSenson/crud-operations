const mongoose = require('mongoose');

const Schema =mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    blockStatus:{
        type:Boolean
    },
    address : [{
        name : { type : String },        
        address1 : { type : String},
        address2 : { type : String},
        city : { type : String },
        state : { type : String },
        zip : { type : Number } 

    }]
},{timestamps : true})

const User=mongoose.model('User',UserSchema);
module.exports=User

// const mongoose = require("mongoose");

// const userModel = new mongoose.Schema({
//     name: { type: String, required: true },
//     password: { type: String, required: true }
// });

// // userModel.methods.isPasswordValid = function (password) {
// //     return bcrypt.compareSync(password, this.password);
// // };

// // // Before saving a user to the database, hash the password using bcrypt
// // userModel.pre('save', async function (next) {   
// //     try { 
// //         if (!this.isModified('password')) {
// //             return next();
// //         }
// //         // Generate salt and hash password
// //         this.salt = await bcrypt.genSalt(10);
// //         this.password = await bcrypt.hash(this.password, this.salt);
// //         next();
// //     } catch (err) {
// //         console.log(err);
// //     }
// // });

// module.exports = mongoose.model("User", userModel);
    