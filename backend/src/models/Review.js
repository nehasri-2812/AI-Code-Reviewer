import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},


language:{
type:String,
required:true
},


code:{
type:String,
required:true
},


result:{
type:Object
},


score:{
type:Number
}

},
{
timestamps:true
});


export default mongoose.model(
"Review",
reviewSchema
);