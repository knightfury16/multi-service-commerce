require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const productRouter = require('./routers/product');
const userRoute = require('./routers/user');
const adminRoute = require('./routers/admin');
const orderRoute = require('./routers/order');


const app = express();
// Configure CORS
const corsOptions = {
  origin: 'http://localhost:4000', // Specify the frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
// Parse JSON bodies
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/api/user', userRoute);
app.use('/api/products', productRouter);
app.use('/api/admin', adminRoute);
app.use('/api/order', orderRoute);


app.listen(3000, () => {
  console.log("Server started at port 3000");
});
