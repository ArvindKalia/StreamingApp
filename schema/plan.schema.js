import mongoose from "mongoose";
const {Schema} =mongoose;

const planSchema = new Schema({
title:{
    type: String,
    required: [true,"Title is required !"]
},
desc:{
    type: String,
    required: [true,"Description is required !"]
},
emi:{
    type: String,
    required: [true,"Emi is required !"]
},
amount:{
    type: Number,
    required: [true,"Amount is required !"]
},
createdAt:{
    type: Date,
    default: Date.now
}
});
mongoose.models={};

export default mongoose.model("plan",planSchema)