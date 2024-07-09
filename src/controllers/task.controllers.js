import { asyncHandler } from "../utils/asyncHandler.js";
import Task from "../models/tasks.models.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      completed,
    });

    res.status(201).json({ task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  const taskID = req.params.id;
  const { title, description, completed } = req.body;

  try {
    const taskUpdate = await Task.findByIdAndUpdate(
      taskID,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    if (!taskUpdate) {
        console.log("Task not found");
        res.status(404).json({ message: "Task not found" });
        return;
      }

    res
      .status(200)
      .json({ task: taskUpdate, message: "Task updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
  
    const task = await Task.findOneAndDelete({ _id: taskId });
  
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    res.status(200).json({ message: "Task deleted successfully" });
});

export const getAllTask =asyncHandler(async(req,res)=>{
    const tasks = await Task.find();
    res.status(200).json({tasks});
})

export const getTask= asyncHandler(async(req,res)=>{
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if(!task){
        return res.status(404).json({message:"Task not found" });
    }
    res.status(200).json({task});
})

export const completedTask =asyncHandler(async(req,res)=>{
 const task = await Task.find({
  completed: true
 });
 res.status(200).json({task});
})

export const incompletedTask =asyncHandler(async(req,res)=>{
  const task = await Task.find({
   completed: false
  });
  res.status(200).json({task});
 })
