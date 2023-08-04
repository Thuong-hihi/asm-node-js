import mongoose from "mongoose";

const { Schema } = mongoose

const moviesSchema = new Schema({
    title: String,
    year: Number,
    genres: [String],
    extract: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    // castId:
    //     { type: mongoose.Schema.ObjectId, ref: "Cast" },


}, {timestamps: true, versionKey: false})

// const Movies = mongoose.model("movies", moviesSchema)
export default mongoose.model("Movies", moviesSchema)