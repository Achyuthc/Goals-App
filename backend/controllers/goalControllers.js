

const asyncHandler=require("express-async-handler")

const Goal=require('../models/goalModel')
const User=require('../models/userModel')

//@desc  get Goals
//route GET /api/goals
//@access Private
const getGoals=asyncHandler(async(req,res)=>{

    const goals=await Goal.find({user:req.user._id});

    res.status(200).json(goals);
})


//@desc  Set Goal
//route POST /api/goals
//@access Private
const setGoal=asyncHandler(async(req,res)=>{

    if(!req.body.text)
    {
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    const goal=await Goal.create({
            text:req.body.text,
            user:req.user._id,
        })
    res.status(200).json(goal);
    
    
    
})


//@desc  UPDATE Goal
//route PUT /api/goals/:id
//@access Private
const updateGoal=asyncHandler(async(req,res)=>{
    
    const goal=await Goal.findById(req.params.id);

    if(!goal)
    {
        res.status(400);
        throw new Error(`goal not found`)
    }

    //user is not found
    if(!req.user){
        res.status(401)
        throw new Error('User Not Found')
    }

    //check goal user and currentUser
    if(goal.user.toString()!==req.user._id)
    {
        res.status(401)
        throw new Error('User Not Authorized')
    }
    
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,{user:req.user._id,text:req.body.text},{new:true,});
    
    res.status(200).json(updatedGoal);
    
})

//@desc  Delete Goal
//route DELETE /api/goals/:id
//@access Private
const deleteGoal=asyncHandler(async(req,res)=>{

    const goal=await Goal.findById(req.params.id);

    if(!goal)
    {
        res.status(400);
        throw new Error('Goal not Found')
    }

    //user is not found
    if(!req.user){
        res.status(401)
        throw new Error('User Not Found')
    }

    //check goal user and currentUser
    if(goal.user.toString()!=req.user._id)
    {
        res.status(401)
        throw new Error('User Not Authorized')
    }

    await goal.remove()
    res.status(200).json({id:req.params.id})
})




module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}