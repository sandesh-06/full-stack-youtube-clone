//Since every function or method is async and has a try catch block, why not create a common wrapper and pass the functions to this wrapper.


const asyncHandler = (func)=>{ //this is a function which takes a function as a parameter and executes it
    return async (req, res, next)=>{
        try {
             await func(req, res, next);
        } catch (err) {
            res.status(err.code || 500).json({
                success: false,
                message: err.message
            })
        }
    }
} //this can also be written as "aH = (func)=>async()=>{}"
export {asyncHandler}


/*  WRITNG THE SAME USING PROMISES 

    const asyncHandler = (requestHandler)=>{
        (req, res, next)=>{
            Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
        }
    }
*/
