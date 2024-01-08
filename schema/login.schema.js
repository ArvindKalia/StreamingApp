import mongoose from "mongoose";
const {Schema} = mongoose;

const loginSchema = new Schema({
    username: String,
    password: String
})

export default mongoose.model("user",loginSchema);