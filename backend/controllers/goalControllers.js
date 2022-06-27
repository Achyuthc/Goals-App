

const asyncHandler=require("express-async-handler")
//@desc  get Goals
//route GET /api/goals
//@access Private
const getGoals=asyncHandler(async(req,res)=>{

    res.json({message:'get Goals'});
})


//@desc  Set Goal
//route POST /api/goals
//@access Private
const setGoal=asyncHandler(async(req,res)=>{

    if(!req.body.text)
    {
        req.statusCode(400)
        throw new Error('please add the text field')
    }
    
    res.json({message:`set Goals `});
})


//@desc  UPDATE Goal
//route PUT /api/goals/:id
//@access Private
const updateGoal=asyncHandler(async(req,res)=>{
    res.json({message:`update Goals ${req.params.id}`});
})

//@desc  Delete Goal
//route DELETE /api/goals/:id
//@access Private
const deleteGoal=asyncHandler(async(req,res)=>{
    res.json({message:`delete Goals ${req.params.id}`});
})




module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}