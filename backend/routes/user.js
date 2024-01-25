const express = require("express");
const { createUser, checkUser, updateUser } = require("../types");
const { User, AccountDetails } = require("../db");

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");


const router = express.Router();

router.post("/signup",async (req,res)=>{
    const createPayLoad = req.body;
    const parsePayLoad = createUser.safeParse(createPayLoad);
    const existingUser = await User.findOne({username:createPayLoad.username});

    if(existingUser){
        res.status(411).send(
            "User already exist"
        );
        return;
    }

    
    if(!parsePayLoad.success){
        res.status(411).send(false);
        return;
    }

   const user = await User.create({
        username: createPayLoad.username,
        firstName: createPayLoad.firstName,
        lastName: createPayLoad.lastName,
        password: createPayLoad.password

    })
    const userId = user._id;
    const accountDetails = await AccountDetails.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 1000) + 1
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).send(true);

    return;
})

router.post("/signin",async (req,res)=>{

    /* 
        email/username: 
        password: 
        have to check both of them are correct or not

    */
   const userPayLoad = req.body;
    const parseUserPayLoad = checkUser.safeParse(userPayLoad);

    if(!parseUserPayLoad.success){
        res.status(411).send(false);
        return;
    }

    const existingUser =await User.findOne({username: userPayLoad.username})
    

    if(existingUser){
        console.log(existingUser.password);
        if(existingUser.password == userPayLoad.password){
            const userAccount = await AccountDetails.findOne({userId: existingUser._id});
       
            res.status(200).json({
                firstName:existingUser.firstName,
                lastName:existingUser.lastName,
                userId:existingUser._id,
                balance: userAccount.balance
            });
            return;
        }
        else{
            res.status(411).send(false);
            return;
        }
    }

    res.status(411).send(false);
    return ;

})

router.put("/",async (req,res)=>{
    const { success } = updateUser.safeParse(req.body)

    const existingUser = User.findOne({
        username: req.body.username
    })

    if(!existingUser){
        res.status(411).json({
            msg:"User not found"
        })
        return;
    }
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    console.log(req.userId);
    await User.findOneAndUpdate({username:req.body.username},{
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        password: req.body.password
    })

    res.json({
        message: "Updated successfully"
    })
    /*const userPayLoad = req.body;
    const parseUserPayLoad = updateUser.safeParse(userPayLoad);

    if(!parseUserPayLoad.success){
        res.status(411).json({
            msg: "Error while updating the data"
        })
    }

    await User.updateOne(userPayLoad,{
        id:req.userId
    })

    res.json({
        message: "Updated succesfully"
    })*/
})


router.get("/bulk",async (req,res)=>{

    const userDetails = req.body;

    const users = await User.find({
        firstName:userDetails.firstName,
        lastName:userDetails.lastName
        
    })

    res.json({
        user : users.map(user=> ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

router.get("/allUsers", async (req,res)=>{
    const users = await User.find({});
    res.json({
        users
    })
})

module.exports = router;