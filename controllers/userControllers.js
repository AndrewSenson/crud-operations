const userModel = require('../model/userModel');
const userHelper = require('../helpers/userHelpers');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userLogin = (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username && password){
        userModel.findOne({username:username, password:password})
        .then((result)=>{
            console.log("Result : ", result);
            if(!result){
                res.send({status:false , message:"User Not Found"});
                }else{
                    // create token
                    var token=jwt.sign({userId:result._id},process.env.SECRET_KEY,{expiresIn:'1h'});
                    res.header("auth-token",token).send({status:true , data:{userId:result._id, token:token}});
                    // send response with token 
                    res.header({'auth-token':token}).send({status:true , data:{userId:result._id, name:result.name}})
                    res.header({'auth-token':token}).send({status:true , data:{userId:result._id, name:result.name}})
                    res.header({'auth-token':token}).send({status:true , data:{token:token, userId:result._id}})
                    res.send({status:true , message:"User Logged In Successfully",token:token});
                }
         })
         .catch((err)=>console.log(err));
     }else{
         res.send({status:false , massage:"Please provide all details"});
     }
}



// function verifyToken(req,res,next){
//   let token = req.headers['x-access-token'];
//   if (!token) {return res.status(403).send({auth: false, message: 'No Token Provided.'})}
//   jwt.verify(token, process.env.SECRET_KEY,function(err, decoded) {
//       if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
//       else {
//           req.userId = decoded.userId;
//           next();
//       }
//   });
// }

// module.exports.verifyToken = verifyToken;





const userRegister = async (req, res) => {
    const { name, email, password, mobile, address } = req.body;

    if (name && email && password && mobile && address) {
        try {
            const user = await userModel.findOne({ email: email });
            if (user) {
                res.json('Email already exists');
            } else {
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

                const newUser = new userModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    mobile: mobile,
                    address:  {
                        name: address.name,
                        address1: address.address1,
                        address2: address.address2,
                        city: address.city,
                        state: address.state,
                        zip: address.zip
                    }
                });

                await newUser.save();

                // Create and send the token
                const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                res.cookie("jwt", token, { httpOnly: true }).send('User created successfully!');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error');
        }
    } else {
        res.status(400).json('All fields are required');
    }
};




module.exports={userRegister,userLogin}
                    

