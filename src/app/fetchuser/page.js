"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const FetchUser = () => {
  const { address } = useAccount();
  const [name, setName] = useState("");
  const [raddress, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [chain, setChain] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);

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
      console.log("Addresses:", addresses);

      setAllNames(names);
      setAllAddresses(addresses);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleNameChange = (e) => {
    const enteredName = e.target.value.toLowerCase();
    setName(enteredName);
  };

  const handleAddressChange = (e) => {
    const enteredAddress = e.target.value.toLowerCase();
    setAddress(enteredAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = address;
    if (!name && !address) {
      handleNewUser();
    } else {
      const userData = { userid, name, address };
      console.log(userData);
      const useralldata = { address, amount, chain };
      console.log(useralldata);
    }
    const post_user_data = {
      userid: address,
      name: name,
      address: raddress,
    };
    try {
      let result = await fetch(`http://localhost:3000/api/sd`, {
        method: "POST",
        body: JSON.stringify(post_user_data),
      });

      result = await result.json();
      console.log("Result after submission:", result);
      if (result.success) {
        alert("Added to MongoDB");
        setName("");
        setAddress("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNewUser = () => {
    const newUser = { name, raddress, amount };
    console.log("New User Data:", newUser);
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
            list="name-suggestions" // Connect the input to the datalist
            required
          />
          <datalist id="name-suggestions">
            {" "}
            {/* Define the datalist */}
            {allNames.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <label
            htmlFor="raddress"
            className="block text-gray-700 font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="raddress"
            value={raddress}
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
            type="text"
            id="amount"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
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
