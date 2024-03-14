"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [usersData, setUsersData] = useState([]);
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const { address } = useAccount();

  const fetchUserDetails = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/sd`);
      const response = await result.json();
      console.log("Response from API:", response);

      // Filter the response data to get only the records where userid is equal to address
      const filteredData = response.result.filter(
        (user) => user.userid === address
      );
      // console.log("Filtered data:", filteredData);

      // Set the filtered data in the state
      setUsersData(response.result);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleEdit = (index) => {
    setEditUserIndex(index);
    setEditName(usersData[index].name);
    setEditAddress(usersData[index].address);
  };

  const handleUpdate = async (index) => {
    try {
      console.log("entered into try block");
      const result = await fetch(`http://localhost:3000/api/sd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          address: editAddress,
        }),
      });
      console.log("result", result);
      console.log("edit address", editAddress, "editname:", editName);
      if (result.ok) {
        console.log("Data updated successfully");
        toast.success("Data updated successfully");
        const updatedUsersData = [...usersData];
        updatedUsersData[index] = {
          ...updatedUsersData[index],
          name: editName,
          address: editAddress,
        };
        setUsersData(updatedUsersData);
        setEditUserIndex(null);
        setEditName("");
        setEditAddress("");
        fetchUserDetails();
      } else {
        console.error("Error updating user:", result.statusText);
        toast.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating data");
    }
  };

  const handleDelete = async (index) => {
    try {
      const addressToDelete = usersData[index].address;
      const result = await fetch(`http://localhost:3000/api/sd`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: addressToDelete }),
      });
      if (result.ok) {
        console.log("Data deleted successfully");
        toast.success("Data deleted successfully");
        const updatedUsersData = [...usersData];
        updatedUsersData.splice(index, 1);
        setUsersData(updatedUsersData);
      } else {
        console.error("Failed to delete data");
        toast.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting data");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">
                {editUserIndex === index ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editUserIndex === index ? (
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                ) : (
                  user.address
                )}
              </td>
              <td className="border px-4 py-2">
                {editUserIndex === index ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Page;
