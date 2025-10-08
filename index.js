const express = require("express");
const products = require("./data/products");
const app = express();
const port = 3000;

app.use(express.json());

// middleware para permitir CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// http://localhost:3000/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello",
    timestamp: new Date().toDateString(),
    status: "succes",
  });
});

// get product by id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(404).json({
      mensage: "producto no encontrado",
      timestamp: new Date().toISOString(),
      status: "error",
    });
  }
  res.json({
    message: "producto encontrado",
    timestamp: new Date().toISOString(),
    status: "succes",
    products: product,
  });
});

// create product - http://localhost:3000/products
app.post("/products", (req, res) => {
  const { name, price, category, stock, image } = req.body;
  const product = {
    id: products.length + 1,
    name,
    price,
    category,
    stock,
    image,
  };
  products.push(product);
  res.json({
    message: "producto creado",
    timestamp: new Date().toISOString(),
    status: "succes",
    products: product,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
