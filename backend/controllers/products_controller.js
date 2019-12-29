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
      res.status(500).json({ product: "There is no product for this id" })
    );
};

exports.getRelatedProduct = (req, res, next) => {
  const errors = {};
  const page = req.query.page;
  const limit = req.query.limit;
  Product.paginate(
    { brand: req.params.brand },
    {
      page: page,
      limit: limit
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
      res.status(500).json({ product: "There is no product for this brand" })
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

// exports.getProductsByMemory = (req, res, next) => {
//   const errors = {};
//   const page = req.query.page;
//   const limit = req.query.limit;
//   const regex = `^${req.params.memory}$`;

//   Product.paginate({}, { page: page, limit: limit }, function(err, products) {
//     if (!products) {
//       errors.noproduct = "There are no products";
//       return res.status(404).json(errors);
//     }
//     const filteredProducts = price[itemKey].filter(
//       product => product.memory == { $regex: req.params.memory, $options: "i" }
//     );
//     if (filteredProducts.length === 0) {
//       return res.status(404).json({ processornotfound: "No item found" });
//     } else {
//       return res.json({ processor: filteredProducts[0] });
//     }
//   }).catch(err =>
//     res.status(404).json({ product: "There is no product for this memory" })
//   );
// };

//memory: { $regex: req.params.memory, $options: "i" }

// // Get processors price
// exports.getProductsByMemory = (req, res) => {
//   Product.find()
//     .lean()
//     .then(price => {
//       console.log(req.query.memory);
//       const memory = req.query;
//       const filteredProcessors = price[itemKey].filter(
//         processor => processor.memory === memory
//       );
//       if (filteredProcessors.length === 0) {
//         return res.status(404).json({ processornotfound: "No item found" });
//       } else {
//         return res.json({ processor: filteredProcessors });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// };

exports.getProductsByCategory = (req, res, next) => {
  const errors = {};
  const page = req.query.page;
  const limit = req.query.limit;
  Product.paginate(
    { category: req.params.category },
    {
      page: page,
      limit: limit
    }
  )
    .then(products => {
      if (!products) {
        errors.noproduct = "There is no product for this category";
        res.status(404).json(errors);
      }
      res.json({ products });
    })
    .catch(err => res.status(500).json(err));
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
