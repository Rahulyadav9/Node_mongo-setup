const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Users");
const Order = require("./models/Orders");
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch(err=>{
    console.log("err", err)
})
// Route: Create a new user
app.post('/users', async (req, res) => {
    try {
        console.log(req.body)
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

app.post('/orders', async(req, res)=>{
    const { userId, productName, quantity, price } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const order = new Order({
        productName,
        quantity,
        price,
        user: userId,
      });
      await order.save();
  
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
})

app.get('/users/:userId/orders', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await Order.find({ user: userId }).populate('user', 'name email');
      res.json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});
app.listen(4000,()=>[
    console.log("App running on port:4000")
])
