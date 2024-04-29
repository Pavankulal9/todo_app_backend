import { Todo } from "../models/todo.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserTodos = asyncHandler(async(req,res)=>{
  const username = req.user.username;

  const Todos = await Todo.find({owner:username}).sort({createdAt:-1});

  res
  .status(200)
  .json(
    new ApiResponse(200,Todos,"fetched user todos successfully")
  );

});

const getSingleUserTodo  = asyncHandler(async(req,res)=>{
    const {todoId} = req.params;
  
    const todo = await Todo.findById(todoId);

    if(!Todo){
        throw new ApiError(400,"Todo not found!");
    }
  
    res
    .status(200)
    .json(
      new ApiResponse(200,todo,"fetched user todos successfully")
    );
  
  });

const addUserTodos = asyncHandler(async(req,res)=>{
    const {title}= req.body;

    if(!title && title === ""){
        throw new ApiError(400,"title field required!");
    }

    const todo = await Todo.create({
        title,
        owner: req.user.username
    });

    res
    .status(200)
    .json(
        new ApiResponse(200,todo,"Todo added successfully")
    );
});

const updateUserTodo = asyncHandler(async(req,res)=>{
    const {_id,title,isCompleted,pin}= req.body;

    if((!title || title === "")&&(!isCompleted || isCompleted === "")&&(!pin || pin === "")){
        throw new ApiError(400,"All fields required to update!");
    }
    
    const todo = await Todo.findByIdAndUpdate(
        _id,
        {
            $set:{
                title,
                isCompleted,
                pin
            }
        },
        {
            new:true
        }
    );

    if(!todo){
        throw new ApiError(400,"Invaild Todo!");
    }


    res
    .status(200)
    .json(
        new ApiResponse(200,todo,"Updated todo successfully")
    )
});

const removeUserTodo = asyncHandler(async(req,res)=>{
    const {todoId} = req.params;

    if(!todoId){
        throw new ApiError(400,"Id missing");
    }


    await Todo.findByIdAndDelete(todoId);


    res
    .status(200)
    .json(
        new ApiResponse(200,{},"Removed todo successfully")
    );
})

export {
    addUserTodos,
    getUserTodos,
    getSingleUserTodo,
    updateUserTodo,
    removeUserTodo
}