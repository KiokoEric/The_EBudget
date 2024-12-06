const cors = require("cors");
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

// MIDDLEWARE

app.use(cors({
    origin: ["https://ebudget-delta.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// MONGODB CONNECTION   

const dbUrl = process.env.MONGODB_URL

mongoose.connect(dbUrl)
.then(() => console.log("Connected to the database!"))

// IMPORT ROUTES

    const UserRoute = require("./Routes/UserRoute");
    const IncomeRoute = require("./Routes/IncomeRoute"); 
    const ExpenseRoute = require("./Routes/ExpenseRoute"); 
    const SavingsRoute = require("./Routes/SavingsRoute"); 

    app.use("/Users", UserRoute);
    app.use("/Income", IncomeRoute);
    app.use("/Expense", ExpenseRoute);  
    app.use("/Savings", SavingsRoute);

app.listen(4000)
