import mongoose from "mongoose"; 

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    name : {
        type : String, 
        required : true 
    },
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String, 
        required : true,
    },
    age : {
        type : Number, 
        required : true 
    },
    city : {
        type : String, 
        required : true 
    },
    zipcode : {
        type : String, 
        required : true 
    },
    isdeleted : {
        type : Boolean, 
        default : false
    }
});


export default mongoose.model("User" , userSchema);

// Id (Generated)
// Email , Name , Age , City , Zip code
