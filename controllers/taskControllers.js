const taskSchema = require('../model/taskSchema')

const addTask = async (req,res, next)=>{
    
    try {
        const {title, description} = req.body;

        await taskSchema.create({title, description, user: req.user})

        res.status(201).json({
          status: 'success',
          message: 'Task created successfully!'
    })
    } catch (error) {
        next(new Error("Fetching Error!"))
    }

}

const getTask = async (req, res)=>{

    try {
        const userId = req.user._id;
    
        const userTask = await taskSchema.find({user:userId})

    res.status(201).json({
        status: 'success',
        userTask
    })
    } catch (error) {
        next(new Error("Fetching Error!"))
    }
}


const updateTask = async (req, res, next)=>{
    
    try {
        const {id} = req.params;
        console.log(id)
        const {task, description} = req.body;
        console.log(task, description)
    
        const updated = await taskSchema.findById(id);
        console.log(updated)
    
        if(!updated){
            return next(new Error('Task not found'))
            // return res.status(404).json({
            //     status: false,
            //     message: err.message
            //  })
        }
    
        if(task){
            updated.task = task;
        }
        if(description){
            updated.description = description;
        }
    
        updated.isCompleted = !updated.isCompleted
    
        await updated.save();
    
        res.status(201).json({
            status: 'success',
            message : "Task updated!",
            updated
        })
    } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
                
            })
        }

}

const deleteTask = async (req, res, next)=>{

    try {
        const deleted = await taskSchema.findById(req.params.id);

    if(!deleted){
        // return next(new Error("Task"))
        return res.status(404).json({
            status: false,
            message: err.message
         })
    }

    await deleted.deleteOne();

    res.status(201).json({
        status: 'success',
        message : 'Task deleted!'
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
            
        })
    }

}


module.exports = {addTask, getTask, updateTask, deleteTask};