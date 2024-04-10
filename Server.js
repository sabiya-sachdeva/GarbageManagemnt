require("dotenv").config();
const express = require("express");
const app = express();
const port = 3005; //
const cors = require("cors");
require("./Db/Db");

app.use(cors());
app.use(express.json()); //use the json data convert to object

// Routes
app.use(require("./routes/auth"));

const imageData = [
  { id: 1, name: "Plastic Bottles & Cans", image: "./Types/plastic.jpg", rate: 5 },
  { id: 2, name: "Paper Waste", image: "./Types/paper.jpg", rate: 3 },
  { id: 3, name: "Glass Waste", image: "./Types/Glass.png", rate: 8 },
  { id: 4, name: "Metal Waste", image: "./Types/metal.png", rate: 10 },
];

const Data = [
  {
    id: 5,
    name: "Organic Waste",
    image: "./Types/organic.jpg",
    rate: 4,
  },
  {
    id: 6,
    name: "Steel Waste",
    image: "./Types/Steel.png",
    rate: 12,
  },
  {
    id: 7,
    name: "Iron Waste",
    image: "./Types/Iron.png",
    rate: 15,
  },
  {
    id: 8,
    name: "Bulky Waste",
    image: "./Types/bulky.jpg",
    rate: 15,
  },
];

// Set up a route to fetch data
app.get("/api/data", (req, res) => {
  res.json(imageData);
});

app.get("/api/data1", (req, res) => {
  res.json(Data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
