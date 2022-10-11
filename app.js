const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/buy-emir", async (req, res) => {
  const reqUrl = "https://api.commerce.coinbase.com/charges/";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-CC-Api-Key": "583ddb17-3714-4a7e-86e6-10ae7e7e7152",
      "X-CC-Version": "2018-03-22",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      local_price: { amount: 0.99, currency: "ETH" },
      redirect_url: "http://localhost:3000/accepted",
      cancel_url: "http://localhost:3000/cancelled",
      pricing_type: "fixed_price",
    }),
  };
  const response = await fetch(reqUrl, options);
  const data = await response.json();

  res.render("emir", {
    eth_address: data["data"]["addresses"]["ethereum"],
    payment_link: data["data"]["hosted_url"],
  });
});

app.get("/buy-efe", async (req, res) => {
  const reqUrl = "https://api.commerce.coinbase.com/charges/";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-CC-Api-Key": "583ddb17-3714-4a7e-86e6-10ae7e7e7152",
      "X-CC-Version": "2018-03-22",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      local_price: { amount: 0.041, currency: "ETH" },
      redirect_url: "http://localhost:3000/accepted",
      cancel_url: "http://localhost:3000/cancelled",
      pricing_type: "fixed_price",
    }),
  };

  const response = await fetch(reqUrl, options);
  const data = await response.json();
  res.render("efe", {
    eth_address: data["data"]["addresses"]["ethereum"],
    payment_link: data["data"]["hosted_url"],
  });
});

app.get("/accepted", (req, res) => {
  res.render("accepted");
});

app.get("/cancelled", (req, res) => {
  res.render("cancelled");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
