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
  ],
  graphics: [
    {
      label: {
        type: String
      },
      value: {
        type: Number
      }
    }
  ],
  memory: [
    {
      label: {
        type: String
      },
      value: {
        type: Number
      }
    }
  ],
  storage: [
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

module.exports = Prices = mongoose.model("prices", pricesSchema);
