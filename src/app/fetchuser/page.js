"use client";
import React, { useState, useEffect } from "react";

const FetchUser = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);

  // Function to fetch user details and store names and addresses in state
  const fetchUserDetails = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/sd`);
      const response = await result.json();
      console.log("Response from API:", response);
      const usersData = response.result;
      const names = usersData.map((user) => user.name.toLowerCase());
      const addresses = usersData.map((user) => user.address.toLowerCase());
      setAllNames(names);
      setAllAddresses(addresses);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Function to handle changes in the name input field
  const handleNameChange = (e) => {
    const enteredName = e.target.value.toLowerCase(); // Convert entered name to lowercase
    setName(e.target.value);

    // Find the index of the entered name in the allNames array (case-insensitive)
    const index = allNames.findIndex((n) => n === enteredName);
    if (index !== -1) {
      setAddress(allAddresses[index]);
    } else {
      setAddress("");
    }
  };

  // Function to handle changes in the address input field
  const handleAddressChange = (e) => {
    const enteredAddress = e.target.value.toLowerCase(); // Convert entered address to lowercase
    setAddress(e.target.value);

    // Find the index of the entered address in the allAddresses array (case-insensitive)
    const index = allAddresses.findIndex((a) => a === enteredAddress);
    if (index !== -1) {
      setName(allNames[index]);
    } else {
      setName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, address, amount };
    console.log(userData); // You can remove this line, it's just to show the data in the console
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Listify</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Chain
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FetchUser;
