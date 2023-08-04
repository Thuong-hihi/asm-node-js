import mongoose from "mongoose";
const { Schema } = mongoose
const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 4,
    }

   }, { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
