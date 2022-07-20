const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')

//@desc  register user
//route post /api/users
//@access Public
const registerUser=asyncHandler(  async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        res.status(400)
        throw new Error('add all the fields')
    }

    //check if user exists
    const userExists=await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        
        throw new Error('user already exist')
    }

    //hash the password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    // create user
    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        
    })

    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    
})


//@desc  login user
//route post /api/users/login
//@access Public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    //check for the user details
    const user=await User.findOne({email})

    if(user&&await bcrypt.compare(password,user.password))
    {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
})

//@desc  getMe 
//route post /api/users/me
//@access Public

const getMe=asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:'30d',
        })
}

module.exports={
    registerUser,loginUser,getMe,
}