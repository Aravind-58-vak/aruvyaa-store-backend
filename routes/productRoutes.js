router.post("/seed", async (req, res) => {
  const products = [
    { name: "Milk", category: "dairy", price: 50, stock: 20 },
    { name: "Curd", category: "dairy", price: 40, stock: 30 },
    { name: "Butter", category: "dairy", price: 60, stock: 25 },

    { name: "Apples", category: "fruits", price: 120, stock: 35 },
    { name: "Bananas", category: "fruits", price: 40, stock: 50 },
    { name: "Oranges", category: "fruits", price: 80, stock: 40 },

    { name: "Tomatoes", category: "vegetables", price: 25, stock: 60 },
    { name: "Potatoes", category: "vegetables", price: 20, stock: 90 },
    { name: "Onions", category: "vegetables", price: 30, stock: 70 },

    { name: "Chips", category: "snacks", price: 20, stock: 100 },
    { name: "Biscuits", category: "snacks", price: 25, stock: 80 },

    { name: "Coke", category: "beverages", price: 40, stock: 60 },
    { name: "Pepsi", category: "beverages", price: 40, stock: 60 }
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    res.json({ message: "Database Seeded Successfully 🚀" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});