const userModel = require('../model/userModel');
const userHelper = require('../helpers/userHelpers');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');


function verifyToken(req,res,next){
    let token = req.headers['x-access-token'];
    if (!token) {return res.status(403).send({auth: false, message: 'No Token Provided.'})}
    jwt.verify(token, process.env.SECRET_KEY,function(err, decoded) {
        if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
        else {
            req.userId = decoded.userId;
            next();
        }
    });
  };
  


  const userLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        userModel.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res.send({ status: false, message: "User Not Found" });
                }

                // Compare the provided password with the hashed password stored in the database
                bcrypt.compare(password, user.password)
                    .then((match) => {
                        if (!match) {
                            return res.send({ status: false, message: "Incorrect password" });
                        }

                        // Passwords match, create and send token
                        var token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        res.header("auth-token", token).send({ status: true, data: { userId: user._id, token: token } });
                    })
                    .catch((error) => {
                        console.error('Error comparing passwords:', error);
                        res.status(500).json({ error: 'Internal server error' });
                    });
            })
            .catch((error) => {
                console.error('Error finding user:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        res.send({ status: false, message: "Please provide all details" });
    }
};








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




module.exports={userRegister,userLogin,verifyToken};
                    

