const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String
  },
  dimension: {
    type: String
  },
  weight: {
    type: String
  },
  operatingsystem: {
    type: String
  },
  display: {
    type: String
  },
  processor: {
    type: String
  },
  chipset: {
    type: String
  },
  graphic: {
    type: String
  },
  memory: {
    type: String
  },
  storage: {
    type: String
  },
  ports: [],
  opticaldrive: {
    type: String
  },

  fingerprint: {
    type: String
  },
  speakers: {
    type: String
  },
  camera: {
    type: String
  },
  keyboard: {},
  wifi: {
    type: String
  },
  bluetooth: {
    type: String
  },
  battery: {
    type: String
  },
  acpower: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: String
  }
});

module.exports = Product = mongoose.model("products", productSchema);
