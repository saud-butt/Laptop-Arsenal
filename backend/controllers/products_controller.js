const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  const errors = {};
  const page = req.query.page;
  const limit = req.query.limit;
  const options = {
    page: page,
    limit: limit
  };
  Product.paginate({}, options, function(err, products) {
    if (!products) {
      errors.noproduct = "There are no products";
      return res.status(404).json(errors);
    }
    res.json({ products });
  }).catch(err => res.status(404).json({ product: "There are no products" }));
};

exports.getProductsById = (req, res, next) => {
  const errors = {};

  Product.findOne({ _id: req.params.productId })
    .then(product => {
      if (!product) {
        errors.noproduct = "There is no product for this id";
        res.status(404).json(errors);
      }

      res.json(product);
    })
    .catch(err =>
      res.status(404).json({ product: "There is no product for this id" })
    );
};

exports.getRelatedProduct = (req, res, next) => {
  const errors = {};
  Product.paginate(
    { brand: req.params.brand },
    {
      page: 1,
      limit: 8
    }
  )
    .then(products => {
      if (!products) {
        errors.noproduct = "There is no product for this brand";
        res.status(404).json(errors);
      }
      res.json({ products });
    })
    .catch(err =>
      res.status(404).json({ product: "There is no product for this brand" })
    );
};

exports.getProductByName = (req, res, next) => {
  const regex = `^${req.params.name}$`;
  Product.find({ name: { $regex: req.params.name, $options: "i" } })
    .limit(15)
    .then(products => {
      res.json(products);
    })
    .catch(err =>
      res.status(404).json({ product: "There is no product for this name" })
    );
};

exports.filterProducts = (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const options = {
    page: page,
    limit: limit
  };
  const filters = JSON.parse(req.query.filters);
  let query = {};
  if (filters) {
    const { name, category, price, brand } = filters;
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (price && price.apply) {
      query.price = { $lte: price.lte, $gte: price.gte };
    }
    if (brand) {
      query.brand = brand;
    }
  }
  Product.aggregatePaginate(
    Product.aggregate([
      {
        $match: { ...query }
      }
    ]),
    options
  )
    .then(products => res.json({ products }))
    .catch(err => res.status(404).json({ product: "There are no products" }));
};
