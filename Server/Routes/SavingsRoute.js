const express = require('express');
const jwt = require("jsonwebtoken");
const SavingsRoute = express.Router();
const cookieParser = require("cookie-parser");
const Savings = require("../Models/SavingsTransaction.js");

const dotenv = require('dotenv');

dotenv.config();
SavingsRoute.use(cookieParser())

const myPassword = process.env.Password

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, myPassword , (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

// ADDING A SAVINGS TRANSACTIONS

SavingsRoute.post("/AddSavings", verifyToken ,async (req, res) => {
    const SavingTransaction = new Savings(req.body)
    try {
        const SavingsTransaction = await SavingTransaction.save()
        res.send(SavingsTransaction)
    } catch (error) {
        console.error(error)
    }
})

// GETTING ALL THE SAVINGS TRANSACTIONS CREATED BY ALL THE USERS

SavingsRoute.get("/AllSavings", async (req, res) => { 
    try{
        const AllSavingTransaction = await Savings.find() 
        res.json(AllSavingTransaction)
    }
    catch(err) { 
        res.send(err)  
    }
})

// GETTING ALL THE SAVINGS CREATED BY A SINGLE USER BY THEIR USER ID

SavingsRoute.get('/:userId/Savings', async (req, res) => {
    const userId = req.params.userId;
    try {
        const SavingTransaction = await Savings.find({ userOwner: userId });
        res.json(SavingTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs.' });  
    }
});

// GETTING TOTAL SAVINGS OF A SINGLE USER BY THEIR USER ID

SavingsRoute.get("/:userId/TotalSavings", async (req, res) => {
    const userId = req.params.userId;

    try{
        const TotalSavings = await Savings.find({ userOwner: userId });
        const TotalAmount = TotalSavings.reduce((total, Savings) => total + Savings.Amount, 0);
        res.json({ TotalAmount });  
    }
    catch(err) { 
        res.send(err)     
    }
})

// UPDATING A SAVINGS TRANSACTION BASED ON THE SAVINGS TRANSACTION ID

SavingsRoute.put("/:id", async (req, res) => {
    try{
        const SavingTransaction = await Savings.findByIdAndUpdate(req.params.id, req.body)
        res.json(SavingTransaction)
    }
    catch(err) {
        res.send(err)
    }
})

// DELETING A SAVINGS TRANSACTION BASED ON THE SAVINGS TRANSACTION ID

SavingsRoute.delete("/:id", async (req, res) => {
    try{
        const SavingTransaction = await Savings.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

// GETTING A SAVINGS TRANSACTION BY ITS ID

SavingsRoute.get('/:id', async (req, res) => {
    try {
    const SavingTransaction = await Savings.findById(req.params.id);
    if (!SavingTransaction) {
        return res.status(404).json({ message: 'Savings Transaction was not found' });
    }
    res.json(SavingTransaction);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = SavingsRoute
