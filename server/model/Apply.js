import express from 'express'; 
import mongoose from 'mongoose'; 

const Schema = mongoose.Schema; 

const applyForJobSchema = new Schema ({
    jobrole : {
        type : String, 
        required: true,
    }, 
    description : {
        type : String, 
        required : true,
    },
    resumelink : {
        type : String,
        required : true , 
    }, 
    email : {
        type : String , 
        require : true,
    }
}); 

export default mongoose.model("Apply" ,applyForJobSchema);