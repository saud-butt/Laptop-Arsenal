const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pricesSchema = new Schema({
  processors: [
    {
      label: {
        type: String
      },
      value: {
        type: Number
      }
    }
  ]
});

pricesSchema.plugin(mongoosePaginate);

module.exports = Prices = mongoose.model("pricess", pricesSchema);
