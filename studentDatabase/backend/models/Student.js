import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true
        },
        rollNumber:{
            type:String,
            unique:true
        },
        course:String,
        semester:Number
    },
    {
        timestamps:true
    }
);

export default mongoose.model("Student",studentSchema);
