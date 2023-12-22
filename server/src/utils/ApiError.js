//Defining a template to recieve error, so that every time we recieve an error it will be in same template, it's a production grade practice

//The custom ApiError class extends the Error class which in inbuilt
class ApiError extends Error{
    constructor(statusCode, message="something went wrong", errors=[], stack=""){

        super(message); //override the message in super class
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError};