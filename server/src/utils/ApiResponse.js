//Defining a template to send/receive response, so that every time we send/recieve a response it will be in same template, it's a production grade practice


class ApiResponse{
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 //when we receive status code from 400 and above, success = false
    }
}

export {ApiResponse}