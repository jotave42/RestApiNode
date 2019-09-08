const express = require("express");

const User = require("../modules/user");

const router = express.Router();

router.post("/resgister",async (req,res)=>{
    const { email } = req.body;
    try{
        if( await User.findOne({ email }))
            return res.status(400).send({error: 'User already exist' });

        const user = await User.create(req.body);
        user.password =undefined;
        return res.send({user });
    } catch(err){
        return res.status(400).send({error: 'Registration failed: '+err });
    }
});
module.exports = app => app.use('/auth',router);