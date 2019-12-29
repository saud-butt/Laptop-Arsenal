const Prices = require("../models/prices");

const id = "5de973744c649a34b975074d";

const mongoose = require("mongoose");
const convertedId = mongoose.Types.ObjectId("5de973744c649a34b975074d");

// Create a table
exports.prices = (req, res) => {
  const price = new Prices({
    processors: [],
    graphics: [],
    memory: [],
    storage: []
  });
  price.save().then(prices => res.json(prices));
};

// Post prices of processors
exports.postProcessorsPrices = (req, res) => {
  Prices.findById(id)
    .then(prices => {
      const price = {
        label: req.body.name,
        value: req.body.price
      };
      prices.processors.unshift(price);
      prices.save().then(priced => res.json(priced));
    })
    .catch(err => res.status(404).json({ notfound: "Not working" }));
};

// Post prices of graphics
exports.postGraphicsPrices = (req, res) => {
  Prices.findById(id)
    .then(prices => {
      const price = {
        label: req.body.name,
        value: req.body.price
      };
      prices.graphics.unshift(price);
      prices.save().then(priced => res.json(priced));
    })
    .catch(err => res.status(404).json({ notfound: "Not working" }));
};

// Post prices of memory
exports.postMemoryPrices = (req, res) => {
  Prices.findById(id)
    .then(prices => {
      const price = {
        label: req.body.name,
        value: req.body.price
      };
      prices.memory.unshift(price);
      prices.save().then(priced => res.json(priced));
    })
    .catch(err => res.status(404).json({ notfound: "Not working" }));
};

// Post prices of storage
exports.postStoragePrices = (req, res) => {
  Prices.findById(id)
    .then(prices => {
      const price = {
        label: req.body.name,
        value: req.body.price
      };
      prices.storage.unshift(price);
      prices.save().then(priced => res.json(priced));
    })
    .catch(err => res.status(404).json({ notfound: "Not working" }));
};

// Get processors price
exports.getProcessorsPrice = (req, res) => {
  Prices.findOne({ _id: convertedId })
    .lean()
    .then(price => {
      console.log(req.query.label);
      const { label, itemKey } = req.query;
      const filteredProcessors = price[itemKey].filter(
        processor => processor.label === label
      );
      if (filteredProcessors.length === 0) {
        return res.status(404).json({ processornotfound: "No item found" });
      } else {
        return res.json({ processor: filteredProcessors[0] });
      }
    })
    .catch(err => res.status(500).json(err));
};
