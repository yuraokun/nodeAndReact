const data = require("../data");

// product controller

const getProducts = (req, res) => {
  const filteredProducts = data.products.map((prod) => {
    const { name, des } = prod;
    return { name, des };
  });
  res.json(filteredProducts);
};

const addProduct = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ errMsg: "please provide name value" });
  }
  return res.status(201).json({ name });
};

const searchProduct = (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  let products = [...data.products];

  if (name) {
    products = products.filter((product) => {
      return product.name.includes(name);
    });
  }

  return res.status(200).json(products);
};

const findProduct = (req, res) => {
  const { productId } = req.params;
  const singleProduct = data.products.find((product) => {
    return product.id === Number(productId);
  });

  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).send("Product doesn`t exist");
  }
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = data.products.find((product) => product.id == Number(id));

  if (!product) {
    return res
      .status(404)
      .json({ success: false, msg: `no product with id ${id}` });
  }

  const newProducts = data.products.map((product) => {
    if (product.id === Number(id)) {
      product.name = name;
    }
    return product;
  });
  return res.status(200).json({ success: true, data: newProducts });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = data.products.find((product) => product.id == Number(id));

  if (!product) {
    return res
      .status(404)
      .json({ success: false, msg: `no product with id ${id}` });
  }

  const newProducts = data.products.filter((product) => {
    return product.id != id;
  });

  return res.status(200).json({ success: true, data: newProducts });
};

module.exports = {
  getProducts,
  addProduct,
  searchProduct,
  findProduct,
  updateProduct,
  deleteProduct,
};
