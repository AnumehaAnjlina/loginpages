import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const User = mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email }).exec();
  
      if (user) {
        const result = await bcrypt.compare(password, user.password);
  
        if (result) {
          res.send({ message: "Login Successful", user: user });
        } else {
          res.send({ message: "Password didn't match" });
        }
      } else {
        res.send({ message: "User not registered" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  });
  
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email }).exec();
  
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          name,
          email,
          password: hashedPassword
        });
  
        await newUser.save();
        res.send({ message: "Successfully Registered, Please login now." });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  });
  
app.listen(9002, () => {
  console.log("BE started at port 9002");
});
