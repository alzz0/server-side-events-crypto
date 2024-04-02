// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;
let dotenv = require("dotenv").config();
const key = dotenv.parsed.CMC_KEY;

let clients = [];
let cryptoListings = [];

async function fetchCryptoDataAndSend() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": key,
        },
      }
    );

    const data = response.data;

    cryptoListings = data;

    clients.forEach((client) => {
      client.response.write(`data: ${JSON.stringify(cryptoListings)}\n\n`);
    });
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
  }
}

function eventsHandler(request, response, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    response,
  };
  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });

  // Call fetchCryptoDataAndSend initially to send the current data to the client
  fetchCryptoDataAndSend();

  // Start interval to fetch and send updated data every 1 min
  const intervalId = setInterval(fetchCryptoDataAndSend, 60000);

  response.on("close", () => {
    clearInterval(intervalId);
  });
}

app.get("/events", eventsHandler);

app.listen(PORT, () => {
  console.log(`Crypto SSE service listening at http://localhost:${PORT}`);
});
