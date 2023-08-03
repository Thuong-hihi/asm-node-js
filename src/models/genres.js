import mongoose from "mongoose";
const { Schema } = mongoose
const genresSchema = new Schema({
    name: String,
    movies: [{type: mongoose.Schema.ObjectId, ref: "Movies"}]
}, { timestamps: true, versionKey: false });

// const Genres = mongoose.model("Genres", genresSchema)
export default mongoose.model("Genres", genresSchema)