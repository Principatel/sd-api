"use client";
import React, { useState, useEffect } from "react";

function Page() {
  const [textValue, setTextValue] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [matchaddress, setMatchaddress] = useState("");
  const [matchname, setMatchname] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  //fetching all names and address stored in the database
  const fetchUserDetails = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/sd`);
      const response = await result.json();
      console.log("Response from API:", response);

      const usersData = response.result;
      const names = usersData.map((user) =>
        user.name ? user.name.toLowerCase() : ""
      );
      const addresses = usersData.map((user) =>
        user.address ? user.address.toLowerCase() : ""
      );
      console.log("Names:", names);
      setAllNames(names);
      console.log("Addresses:", addresses);
      setAllAddresses(addresses);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleTextareaChange = (e) => {
    setTextValue(e.target.value);
  };

  // to map data in table
  // const parseText = () => {
  //   const lines = textValue.split("\n");
  //   const newData = lines.map((line, index) => {
  //     const [address, amount, name] = line.split(/[,= \t]+/);
  //     console.log("address: ", address, "amount: ", amount, "name:", name);
  //     return {
  //       id: index,
  //       label: matchname || null,
  //       address: address,
  //       amount: parseFloat(amount) || 0,
  //     };
  //   });
  //   setTableData(newData);
  // };

  useEffect(() => {
    // parseText();
    handleNameSearch();
  }, [textValue]);

  // replace  @name --> its corresponding address in textarea
  const handleNameSearch = () => {
    // const lines = textValue.split("\n");
    // const newData = lines.map((line, index) => {
    //   if (regex.exec(line) !== null) {
    //   }
    // });
    const regex = /@(\w+)/g;
    let match;
    let updatedTextValue = textValue; // Create a copy of the current textValue

    while ((match = regex.exec(textValue)) !== null) {
      const name = match[1];
      const index = allNames.indexOf(name.toLowerCase());
      if (index !== -1) {
        console.log(`Name: ${name}, Address: ${allAddresses[index]}`);
        const foundAddress = allAddresses[index];
        console.log(name);
        setMatchname(name);
        console.log(foundAddress);
        setMatchaddress(foundAddress);
        updatedTextValue = updatedTextValue.replace(`@${name}`, foundAddress);
        const lines = textValue.split("\n");
        const newData = lines.map((line, index) => {
          const [name, address, amount] = line.split(/[,= \t]+/);
          console.log("name:", name, "address: ", address, "amount: ", amount);
          return {
            id: index,
            label: matchname || null,
            address: foundAddress,
            amount: parseFloat(amount) || 0,
          };
        });
        setTableData(newData);
      } else {
        console.log("else");
        const lines = textValue.split("\n");
        const newData = lines.map((line, index) => {
          const [name, address, amount] = line.split(/[,= \t]+/);
          console.log("address: ", address, "amount: ", amount, "name:", name);
          return {
            id: index,
            label: name || null,
            address: address,
            amount: parseFloat(amount) || 0,
          };
        });
        setTableData(newData);
      }
    }

    // Update the textValue state with the modified value
    setTextValue(updatedTextValue);
  };

  return (
    <div>
      <div id="textify-input">
        <div>
          <h2>Enter Name, Address, and Amount</h2>
          <p>
            Enter name, address, and amount on each line, separated by spaces,
            commas, or equals sign.
          </p>
        </div>
        <textarea
          style={{
            width: "500px",
            height: "300px",
            margin: " 50px 200px",
            border: "1px solid black",
          }}
          spellCheck="false"
          value={textValue}
          onChange={handleTextareaChange}
          placeholder="@Name1 0xe57f4c84539a6414C4Cf48f135210e01c477EFE0 1.41421"
        ></textarea>
      </div>

      <div style={{ margin: "50px 200px" }}>
        <h2>Data List</h2>
        <table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.id}>
                <td>{data.label}</td>
                <td>{data.address}</td>
                <td>{data.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
