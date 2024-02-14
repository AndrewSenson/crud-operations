// const userModel = require('../model/userModel');
// const userHelper = require('../helpers/userHelpers');

// const userLogin = (req,res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     if(username && password){
//         userModel.findOne({username:username, password:password})
//         .then((result)=>{
//             console.log("Result : ", result);
//             if(!result){
//                 res.send({status:false , message:"User Not Found"});
//                 }else{
//                     // create token
//                     var token=jwt.sign({userId:result._id},process.env.SECRET_KEY,{expiresIn:'1h'});
//                     res.header("auth-token",token).send({status:true , data:{userId:result._id, token:token}});
//                     // send response with token 
//                     res.header({'auth-token':token}).send({status:true , data:{userId:result._id, name:result.name}})
//                     res.header({'auth-token':token}).send({status:true , data:{userId:result._id, name:result.name}})
//                     res.header({'auth-token':token}).send({status:true , data:{token:token, userId:result._id}})
//                     res.send({status:true , message:"User Logged In Successfully",token:token});
//                 }
//          })
//          .catch((err)=>console.log(err));
//      }else{
//          res.send({status:false , massage:"Please provide all details"});
//      }
// }

// module.exports.userLogin = userLogin;

// // function verifyToken(req,res,next){
// //   let token = req.headers['x-access-token'];
// //   if (!token) {return res.status(403).send({auth: false, message: 'No Token Provided.'})}
// //   jwt.verify(token, process.env.SECRET_KEY,function(err, decoded) {
// //       if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
// //       else {
// //           req.userId = decoded.userId;
// //           next();
// //       }
// //   });
// // }

// // module.exports.verifyToken = verifyToken;

// const userRegister = ((req,res)=>{
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const mobileNumber = req.body.mobileNumber;
//     const address = req.body.address;
//     if(username && email && password && mobileNumber && address ){
//         users.findOne({$or:[{'email':email}, {'username':username}]}).then((user)=>{
//           if(user){
//             res.json('Email or Username already exists');
//           }else{
//               const newUser = new users({
//                   name : req.body.name,
//                   username : username,
//                   email : email,
//                   password : cryptojs.AES.encrypt(password,'123').toString(),
//                   mobileNumber : mobileNumber,
//                   address : address
//               });
//               newUser.save().then(()=>{
//                 //create and send the token
//                 const token = jwt.sign({userId: newUser._id}, process.env.SECRET_KEY , { expiresIn: "1h"});
//                 res.cookie("jwt", token, {httpOnly: true}).send(token);
//               }).catch((error)=>console.log(error));
//           }
//         })
        
//     }else{
//       res.json('All fields are required')
//     }
// })
// module.exports.userRegister=userRegister;
                    

