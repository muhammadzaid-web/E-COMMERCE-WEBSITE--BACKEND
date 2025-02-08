const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  label:{type:String,required:true ,unique:true},
  value:{type:String,required:true ,unique:true},
});

// Virtual for ID (removes _id from response)
brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Brand", brandSchema);
