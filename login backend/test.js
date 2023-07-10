import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())





mongoose.connect('mongodb://127.0.0.1:27017/login' , 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("DB connected");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", );
});

app.post("/login",(req,res)=>{
    res.send("Anumeha")

})
app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.find({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("be started at port 9002")
})