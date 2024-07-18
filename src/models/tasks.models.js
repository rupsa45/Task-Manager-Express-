import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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