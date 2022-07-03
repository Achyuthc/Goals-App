const express=require('express')
const router=express.Router()
const {getGoals,setGoal,updateGoal,deleteGoal}=require("../controllers/goalControllers")
const {protect}=require('../middleware/authMiddleware')

//get the goals
router.get('/',protect,getGoals)

//post the goal
router.post("/",protect,setGoal)

//update the goal
router.put("/:id",protect,updateGoal)

//delete the goal
router.delete("/:id",protect,deleteGoal)

module.exports=router