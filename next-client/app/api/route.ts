import { NextResponse } from "next/server";
import axios from "axios";
// To handle a GET request to /api
export async function GET(request,res) {
  const {searchParams} = new URL(request.url);
  console.log("❌😅",searchParams)
  const amount = searchParams.get("amount");
  const baseCurrency = searchParams.get("baseCurrency");
  const targetCurrencies = searchParams.get("targetCurrencies");
  

  try {
    // Make a request to CoinMarketCap API to get the conversion
    const response = await axios.get('https://api.coinmarketcap.com/v2/convert', {
      params: {
        amount,
        symbol: baseCurrency,
        convert: targetCurrencies,
      },
    });

    // Extract the conversion data from the response
    const data = response.data;

    // Return the conversion data to the client
    return NextResponse.json({ data}, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversion:', error.message);
    return NextResponse.json({ error:'error'}, { status: 500 });
  }

  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}