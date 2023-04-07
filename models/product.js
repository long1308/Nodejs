import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    //tạo 1 tr category
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category", // liên kết bảng categorry
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(paginate);
export default mongoose.model("Product", productSchema);
