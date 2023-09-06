const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the 'cors' package
const app = express();

// Enable CORS with default options
app.use(cors());

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Load data from the JSON file
const sampleData = JSON.parse(fs.readFileSync('sampledata.json', 'utf8'));

console.log('Sample JSON data:', sampleData); // Add this line to log the data


// Define API endpoints

// GET /products - Retrieve an array of products
app.get('/products', (req, res) => {
  try {
    const products = sampleData.products;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /products/:id - Retrieve one product by ID
app.get('/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = sampleData.products.find((p) => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /users/:id/orders - Retrieve user's orders
app.get('/users/:id/orders', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userOrders = sampleData.orders.filter((order) => order.userId === userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /categories - Retrieve product categories
app.get('/categories', (req, res) => {
  try {
    const categories = sampleData.categories;
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /tags - Retrieve product tags
app.get('/tags', (req, res) => {
  try {
    const tags = sampleData.tags;
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /orders - Create a new order
app.post('/orders', (req, res) => {
  try {
    const { userId, productIds } = req.body;

    // Assuming productIds is an array of product IDs to be ordered
    const products = sampleData.products;
    const orderedProducts = products.filter((p) => productIds.includes(p.id));
    const totalPrice = orderedProducts.reduce((total, product) => total + product.price, 0);

    const newOrder = {
      id: sampleData.orders.length + 1,
      userId,
      products: orderedProducts,
      totalPrice,
    };

    sampleData.orders.push(newOrder);

    // Update the JSON file with the new order
    fs.writeFileSync('sampledata.json', JSON.stringify(sampleData, null, 2), 'utf8');

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = 3300;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
