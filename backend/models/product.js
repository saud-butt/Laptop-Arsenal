const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new Schema({
  category: {
    type: String
  },
  cover: {
    type: String
  },
  brand: {
    type: String
  },
  link: {
    type: String
  },
  images: [],
  name: {
    type: String
  },
  dimensions: {
    height: { type: String },
    width: { type: String },
    depth: { type: String }
  },
  weight: {
    type: String
  },
  os: {
    operating_system: { type: String },
    operating_system_architecture: { type: String }
  },
  display: {
    size: { type: String },
    type: { type: String },
    technology: { type: String },
    mode: { type: String },
    resolution: { type: String }
  },
  processor: {
    processor_type: { type: String },
    processor_model: { type: String },
    processor_core: { type: String },
    processor_speed: { type: String },
    processor_speed_turbo: { type: String }
  },
  chipset: {
    type: String
  },
  graphics: {
    manufacturer: { type: String },
    model: { type: String },
    capacity: { type: String },
    technology: { type: String },
    accessibility: { type: String }
  },
  memory: {
    memory_type: { type: String },
    no_of_dimm_slots: { type: String },
    max_capacity: { type: String }
  },
  storage: {
    ssd: { type: String },
    hdd: { type: String }
  },
  ports: {
    hdmi: { type: String },
    rj45: { type: String },
    card_reader: { type: String },
    mini_display_port: { type: String },
    usb: { type: String },
    lan: { type: String },
    audio_jacks: { type: String },
    io_ports: { type: String }
  },
  opticaldrive: {
    type: String
  },

  security: {
    type: String
  },
  speakers: {
    speaker: { type: String },
    woofer: { type: String }
  },
  camera: {
    type: String
  },
  keyboard: {
    type: String
  },
  wireless: {
    wifi: { type: String },
    bluetooth: { type: String }
  },
  battery: {
    cell: { type: String },
    type: { type: String },
    whr: { type: String }
  },
  ac_power: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: String
  }
});

productSchema.plugin(mongoosePaginate);

productSchema.index({
  name: "text"
});

productSchema.plugin(aggregatePaginate);

module.exports = Product = mongoose.model("products", productSchema);
