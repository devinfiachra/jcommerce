// bin/seeds.js

const mongoose = require("mongoose");
const Product = require("../models/Product.model");

const MONGO_URI =
  /*process.env.MONGODB_URI ||*/ "mongodb://127.0.0.1:27017/jcommerce";

let fakeStoreProducts = [];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        fakeStoreProducts = json;

        // [
        //   {
        //     id: 6,
        //     title: "Solid Gold Petite Micropave ",
        //     price: 168,
        //     description:
        //       "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
        //     category: "jewelery",
        //     image:
        //       "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        //     rating: { rate: 3.9, count: 70 },
        //   },
        // ];
        for (let index = 0; index < fakeStoreProducts.length; index++) {
          let fkProduct = fakeStoreProducts[index];
          //console.log(typeof fkProduct); //obj
          //console.log(fkProduct);

          let { id, title, price, description, category, image, rating } =
            fkProduct;

          //console.log(title, price, description, category, image);

          rating = Math.floor(Math.random() * 5) + 1;
          let quantity = Math.floor(Math.random() * 500) + 1;

          Product.create({
            title,
            description,
            price,
            category,
            rating,
            image,
            quantity,
          });
        }

        return fakeStoreProducts;
      })
      .then((productsFromDB) => {
        console.log(`Created ${productsFromDB.length} products`);
      });

    // Once the documents are created, close the DB connection
    //return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(
      `An error occurred while creating products from the DB: ${err}`
    );
  });
