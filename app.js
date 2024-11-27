const express = require("express")
require("dotenv").config()
const {connectDB} = require("./db")
const productRoute = require("./routes/products")
const path = require("path")
const userModel = require("./models/user")
const session = require("express-session")
const passport = require("passport")
require("dotenv").config();
const connectEnsureLogin = require("connect-ensure-login")

const PORT = process.env.PORT
const app = express()
connectDB()
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookies: {maxAge: 60 * 60 * 1000}
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(userModel.createStrategy())

passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("views", path.join(__dirname, './views') )
app.set("view engine", "ejs")

app.get('/', (req, res)=>{
    res.send("welcome home")
})

// product route is protected only logged in users can access it
app.use("/products",connectEnsureLogin.ensureLoggedIn(), productRoute )

// to render login and sign up pages
app.get("/login", (req, res)=>{
    res.render("login")
})
app.get("/signup", (req, res)=>{
    res.render("signup")
})

// request handler to handle sign up, log in and log out 
app.post("/signup",  (req, res)=>{
   
    const {username, fullname, email, phone, dob, password} = req.body
    if(!username || !fullname || !email || !phone || !dob || !password){
        res.status(400).json({message: "all fields are required"})
    }
    let newUser = new userModel({
        username,
        fullname,
        email,
        phone,
        dob
    })

    userModel.register(newUser, password, (err, user)=>{
        if(err){
            console.log(err);
            res.status(200).send(err);
        }else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect("/products")
            })
        }
    })

    // for simplified data with just username and password also find the commented model for simplified user data
    // const user = req.body
    // userModel.register(new userModel({username: user.username}), user.password, (err, user)=>{
    //     if(err){
    //         console.log(err);
    //         res.status(200).send(err);
    //     }else{
    //         passport.authenticate('local')(req,res,()=>{
    //             res.redirect("/products")
    //         })
    //     }
    // })

})

app.post('/login', passport.authenticate('local',{failureRedirect:"/login"}), (req, res)=>{
    res.redirect('/products')
})

app.post("/logout", (req, res)=>{
    req.logout((err)=>{
        if(err){
            res.status(500).send("unable to log out")
        }
        res.redirect("/");
    });
})

app.listen(PORT, ()=>{
    console.log(`server is running on port:${PORT}` )
})