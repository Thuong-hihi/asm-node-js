import mongoose from "mongoose";
const { Schema } = mongoose
const castSchema = new Schema({
    name: String,
    
}, {timestamps: true, versionKey: false});

// const Cast = mongoose.model("Cast", castSchema)
export default mongoose.model("Cast", castSchema);