"use client";
import CompareTokens from "@/components/CompareTokens";
import React, { useState, useEffect } from "react";

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const tierColorMapper = {
  starter: "text-blue-800 dark:text-blue-600 bg-blue-200 border-blue-200",
  business: "text-cyan-800 dark:text-cyan-600 bg-cyan-200 border-cyan-200",
  enterprise:
    "text-indigo-800 dark:text-indigo-600 bg-indigo-200 border-indigo-200",
};
function App() {
  const [facts, setFacts] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    console.log(facts);
  }, [facts]);
  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:3000/events");

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);

        setFacts(parsedData.data);
      };

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <div className="h-full w-full overflow-x-auto rounded-xl bg-layer-2 px-11 py-6 scrollbar">
      <CompareTokens/>
      <table className="w-full divide-y divide-muted-1">
        <thead className="text-xs font-semibold uppercase text-text">
          <tr>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              #
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Name
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Symbol
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Market Cap
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Price
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Volume (24h)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-muted-1 text-sm font-medium">
          {facts.map((crypto, index) => {
            return (
              <tr key={index}>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <div className="flex items-center space-x-3">
                    <span>{index}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {crypto.name}
                </td>

                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <span
                    className={`${
                      tierColorMapper[crypto.symbol]
                    } inline-flex items-center rounded-full border-2 px-2 py-0.5 text-xs font-semibold capitalize shadow-sm`}
                  >
                    {crypto.symbol}
                  </span>
                </td>

                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <div className="flex items-center space-x-2">
                    <span> {crypto.quote.USD.market_cap}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {currencyFormatter.format(crypto.quote.USD.price)}
                  {/* {crypto.quote.USD.price} */}
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {currencyFormatter.format(crypto.quote.USD.volume_24h)}
                  {/* {crypto.quote.USD.volume_24h} */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
