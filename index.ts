import express from "express"

const app = express()

app.use('/',(req,res,next)=>{
    console.log("hello")
    next()
})

app.use('/add',(req,res,next)=>{
    console.log("hello")
    res.send("<h1>This is the ing</h1>")
})

app.use((req,res,next)=>{
    console.log("hello 2")
})

app.listen(8080)