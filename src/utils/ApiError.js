class ApiError extends Error{ 
    // building a class which is extension of error class that exist in the js i.e. inhariting the property of error class
    constructor(
        //building a constructor with default value because when user did not send any parameter then it will use the default and donot break the APIERROR code
        
        statusCode,
        message = "Something went wrong",
        error = [],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = error

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }

}
export {ApiError}