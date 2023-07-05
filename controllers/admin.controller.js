const mongoose = require("mongoose");
const apiUrl = "https://fakestoreapi.com/products";

const Product = require("../models/Product.model.js");
const mongoURI = process.env.MONGO_URI;

const axios = require("axios");



