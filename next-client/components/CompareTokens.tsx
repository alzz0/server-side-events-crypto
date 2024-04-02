// Your React component file
'use client'
import { useState } from 'react';

function ConversionComponent() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrencies, setTargetCurrencies] = useState('');
  const [conversionData, setConversionData] = useState(null);

  const handleConvert = async () => {
    try {
      const response = await fetch(`/api?amount=${amount}&baseCurrency=${baseCurrency}&targetCurrencies=${targetCurrencies}`);
      const data = await response.json();
      setConversionData(data);
    } catch (error) {
      console.error('Error converting:', error.message);
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} placeholder="Base Currency" />
      <input type="text" value={targetCurrencies} onChange={(e) => setTargetCurrencies(e.target.value)} placeholder="Target Currencies (comma-separated)" />
      <button onClick={handleConvert}>Convert</button>

      {conversionData && (
        <div>
          {/* Display the conversion data */}
          {/* Modify this part according to the structure of the conversion data */}
        </div>
      )}
    </div>
  );
}

export default ConversionComponent;
