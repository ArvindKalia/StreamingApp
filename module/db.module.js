import mongoose from "mongoose";
mongoose.connect(process.env.NEXT_PUBLIC_DB_URL);

export default mongoose;