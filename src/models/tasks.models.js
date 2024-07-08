import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
},{
    timestamps:true
});
const Task = mongoose.model('Task',taskSchema);
export default Task; 