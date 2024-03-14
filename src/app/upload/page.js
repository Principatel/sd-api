"use client";
import React, { useState, useEffect } from "react";
import CSVReader from "react-csv-reader";
import { useAccount } from "wagmi";

function Page() {
  const [csvData, setCsvData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Fetching all users' data and addresses stored in the database
  const fetchUserDetails = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/sd`);
      const response = await result.json();

      const usersData = response.result;
      const addresses = usersData.map((user) =>
        user.address ? user.address.toLowerCase() : ""
      );
      setAllUsersData(usersData);
      setAllAddresses(addresses);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleFileUpload = (data) => {
    setCsvData(data);
  };

  useEffect(() => {
    if (csvData.length > 0) {
      checkMatchingAddresses();
    }
  }, [csvData]);

  const checkMatchingAddresses = () => {
    const eoaAddresses = csvData.map((row) =>
      row[Object.keys(row)[0]] ? row[Object.keys(row)[0]].toLowerCase() : ""
    );

    const matchingNames = eoaAddresses.map((eoaAddress) => {
      const user = allUsersData.find(
        (userData) =>
          userData.address && userData.address.toLowerCase() === eoaAddress
      );
      return user ? user.name : "No Name";
    });

    setCsvData((prevCsvData) =>
      prevCsvData.map((row, rowIndex) => ({
        ...row,
        label: matchingNames[rowIndex],
      }))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CSVReader
        onFileLoaded={handleFileUpload}
        parserOptions={{
          header: true,
          skipEmptyLines: true,
        }}
      />
      {csvData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(csvData[0]).map((header, index) => (
                  <th key={index} className="px-4 py-2">
                    {header}
                  </th>
                ))}
                <th className="px-4 py-2">Label</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}
                >
                  {Object.values(row).map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-800 px-4 py-2"
                    >
                      {value}
                    </td>
                  ))}
                  <td className="border border-gray-800 px-4 py-2">
                    {row.label}
                  </td>
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
