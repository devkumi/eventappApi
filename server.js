require('dotenv').config()

// Requiring module 
const cors = require('cors') 

const express = require('express')

const app = express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions)); 
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const manageeventsRouter = require('./routes/manageevents')
app.use('/manageevents', manageeventsRouter)

app.listen(3001, () => console.log('Server Started'))