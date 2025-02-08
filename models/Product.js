// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const productSchema = new Schema({
//   title: { type: String, required: true, unique: true },
//   description: { type: String, required: true },
//   price: {
//     type: Number,
//     min: [0, "Price must be greater than 0"],
//     max: [10000, "Price must be less than 10000"],
//     required: true,
//   },
//   discountPercentage: {
//     type: Number,
//     min: [1, "Discount must be greater than 1"],
//     max: [99, "Discount must be less than 99"],
//     required: true,
//   },
//   rating: {
//     type: Number,
//     min: [0, "Rating must be greater than 1"],
//     max: [5, "Rating must be less than 5"],
//     default: 0,
//   },
//   stock: { type: Number, min: [0, "Stock must be greater than 0"], default: 0 },
//   brand: { type: String, required: true },
//   tags: { type: [String], required: true },
//   category: { type: String, required: true },
//   thumbnail: { type: String, required: true },
//   images: { type: [String], required: true },
//   deleted: { type: Boolean, default: false },
// });

// const virtual = productSchema.virtual("id");
// virtual.get(function () {
//   return this._id;
// });
// productSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });

// module.exports = mongoose.model("Product", productSchema);


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // MongoDB will auto-generate ObjectId
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "Price must be greater than 0"],
    max: [10000, "Price must be less than 10000"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, "Discount must be greater than 1"],
    max: [99, "Discount must be less than 99"],
    required: true,
  },
  rating: {
    type: Number,
    min: [0, "Rating must be greater than 0"],
    max: [5, "Rating must be less than 5"],
    default: 0,
  },
  stock: { type: Number, min: [0, "Stock must be greater than 0"], default: 0 },
  brand: { type: String, required: true },
  tags: { type: [String], required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

// Virtual for ID (removes _id from response)
const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

// Ensure virtuals are included in JSON output
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };  // Export as an object with Product property
