"use client";
import React, { useState, useEffect } from "react";

function Page() {
  const [textValue, setTextValue] = useState("");
  const [listData, setListData] = useState([]);

  useEffect(() => {
    parseText(textValue);
  }, [textValue]);

  const parseText = (textValue) => {
    const lines = textValue.split("\n");
    let updatedRecipients = [];

    lines.forEach((line) => {
      const [address, value] = line.split(/[,= \t]+/);

      if (address && value) {
        // Check if both address and value are present
        const validValue = isValidValue(value);

        if (isValidAddress(address) && validValue !== false) {
          const isUsdAmount = /\$$/.test(value.trim());
          updatedRecipients.push({
            address,
            value: validValue,
            isUsdAmount,
          });
        }
      }
    });

    setListData(updatedRecipients);
  };

  const isValidAddress = (address) => {
    // Implement your address validation logic here
    return true;
  };

  const isValidValue = (value) => {
    try {
      if (value.includes("$")) {
        value = value.replace("$", "");
        return parseFloat(value);
      } else {
        if (!/^\d/.test(value)) {
          value = value.slice(1);
        }
        return parseFloat(value);
      }
    } catch (err) {
      return false;
    }
  };

  return (
    <div>
      <div id="textify-input">
        <div>
          <h2>Enter Recipients and Amount</h2>
          <p>
            Enter one address and amount on each line, supporting any format.
          </p>
        </div>
        <textarea
          style={{ width: "500px", height: "300px", margin: " 50px 200px" }}
          spellCheck="false"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="0xe57f4c84539a6414C4Cf48f135210e01c477EFE0=1.41421
            0xe57f4c84539a6414C4Cf48f135210e01c477EFE0 1.41421
            0xe57f4c84539a6414C4Cf48f135210e01c477EFE0,1.41421"
        ></textarea>
      </div>

      {listData.length > 0 && (
        <div style={{ margin: "50px 200px" }}>
          <h2>Data List</h2>
          <table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Wallet Address</th>
                <th>Amount(ETH)</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((data, index) => (
                <tr key={index}>
                  <td>{data.address}</td>
                  <td>{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Page;
