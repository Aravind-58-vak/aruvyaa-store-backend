const Order = require("../models/order");

const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, paymentMethod } = req.body;

    // 🔥 Check stock before placing order
    for (let item of products) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`
        });
      }
    }

    // 🔥 Reduce stock
    for (let item of products) {
      await Product.findByIdAndUpdate(
        item._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // 🔥 Create order
    const order = new Order({
      userId,
      products,
      totalAmount,
      paymentMethod,
      status: "Pending"
    });

    await order.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};