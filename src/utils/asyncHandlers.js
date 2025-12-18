const asyncHandler = (requestHandler)=>{
    return (req , res , next)=> {
        Promise.resolve(requestHandler(req , res , next)).catch((err) => next(err))
        
    }
}


export {asyncHandler}



// another way by using higher order function
//=============> example
// const asyncHandler = () ={}
// const asyncHandler = (function)=>() ={}
// const asyncHandler = (function)=> async() ={}

//=========main code===============

// const asyncHandler = (fn) => async(req , res , next) =>{
//     try {
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }