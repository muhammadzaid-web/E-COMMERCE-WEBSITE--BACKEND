const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  label:{type:String,required:true, unique:true },
  value:{type:String,required:true, unique:true },
});

// Virtual for ID (removes _id from response)
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Category", categorySchema);
