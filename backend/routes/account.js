const express = require("express");
const { User, AccountDetails } = require("../db");

const router = express.Router();

router.get("/balance",async (req,res)=>{
    console.log("INSIDE BALANCE")
    const account = await AccountDetails.findOne({
        userId: req.query.userId
    });

    if(!account){
        console.log("User not found")
        res.status(411).send("User not found");
        return;
    }
    console.log(account.balance);
    const balance = account.balance;
    res.status(200).json({
        balance
    })
    return;
})

router.post("/transfer",async (req,res)=>{
    async function accountDetail(username){
        const user =await User.findOne({
            username:username
        })
        
        if(!user){
            res.status(411).json({
                msg:"Inavlid account"
            })

            return false;
        }

        const accountDetails =await AccountDetails.findOne({
            userId: user._id
        })

        return accountDetails;
    }
    const transactionsDetails = req.body;
    /* 
        sendersusername
        recieversusername
        amount

    */
    
    const sendersDetails = await accountDetail(transactionsDetails.sendersusername);
    const recieversDetails = await accountDetail(transactionsDetails.recieversusername);

    const sendingAmount = transactionsDetails.amount;

    const transferFunds = async (sendersDetails,recieversDetails,sendingAmount)=>{
        if(!sendersDetails||!recieversDetails){
            return;
        }
        if(sendersDetails.balance<sendingAmount){
            res.status(411).send(false);
            return;
        }

        await User.findOneAndUpdate({username:req.body.username},{
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            password: req.body.password
        })

        await AccountDetails.findOneAndUpdate({userId:sendersDetails.userId},{
            balance: sendersDetails.balance - sendingAmount
        })

        await AccountDetails.findOneAndUpdate({userId:recieversDetails.userId},{
            balance: recieversDetails.balance + sendingAmount

        })

       

    }
    transferFunds(sendersDetails,recieversDetails,sendingAmount);

    res.status(200).send(true);

    

})


module.exports = router;