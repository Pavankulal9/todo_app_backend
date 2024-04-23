class ApiError extends Error{
    constructor(
        statusCode,
        message="Internal error!,Please try again later",
        error=[],
        stack
    ){
     super(message);
     this.statusCode= statusCode;
     this.data = null;
     this.message= message;
     this.error = error;
     this.sucess = false;

     if(stack){
       this.stack = stack;
     }else{
        Error.captureStackTrace(this, this.constructor);
     }
    }
}

export default ApiError;