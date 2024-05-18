// src/pages/SchemaContents.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const SchemaContents = () => {
  const { id } = useParams(); // schema ID from route params
  const [data, setData] = useState([]);
  const [schema, setSchema] = useState(null);
  const [newData, setNewData] = useState({});
  const [selectedData, setSelectedData] = useState(null); // State for selected data
  const userId = "6644ceceaacf70ef12faab4f"; // Replace with actual user ID from auth

  useEffect(() => {
    const fetchSchemaData = async () => {
      try {
        // Fetch the schema details
        const schemaResponse = await axios.get(
          `${import.meta.env.VITE_SITE_LINK}/user/getUserSchema`,
          {
            params: { userId },
          }
        );

        const selectedSchema = schemaResponse.data.data.find(
          (s) => s._id === id
        );

        setSchema(selectedSchema);

        // Fetch the data based on the schema
        const dataResponse = await axios.post(
          `${import.meta.env.VITE_SITE_LINK}/user/getData`,
          {
            schemaId: id,
            userId,
          }
        );

        setData(dataResponse.data.returnData);
      } catch (error) {
        console.error("Error fetching schema data:", error);
      }
    };

    fetchSchemaData();
  }, [id, userId]);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SITE_LINK}/user/deleteData/${itemId}`,
        {
          data: { userId },
        }
      );
      setData(data.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleAddData = async () => {
    try {
      if (selectedData) {
        // Update existing data
        const response = await axios.put(
          `${import.meta.env.VITE_SITE_LINK}/user/updateData/${
            selectedData._id
          }`,
          {
            userId,
            data: newData,
          }
        );
        setData(
          data.map((item) =>
            item._id === selectedData._id ? response.data.updatedData : item
          )
        );
        setSelectedData(null); // Clear the selected data after updating
      } else {
        // Add new data
        const response = await axios.post(
          `${import.meta.env.VITE_SITE_LINK}/user/addData`,
          {
            schemaId: id,
            userId,
            data: newData,
          }
        );
        setData([...data, response.data.newData]);
      }
      setNewData({});
    } catch (error) {
      console.error("Error adding/updating data:", error);
    }
  };

  const handleUpdate = (item) => {
    setNewData(item.data);
    setSelectedData(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  if (!schema) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {schema.tableName} Contents
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {schema.fields.map((field) => (
                  <th
                    key={field.columnName}
                    className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    {field.columnName}
                  </th>
                ))}
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  {schema.fields.map((field) => (
                    <td
                      key={field.columnName}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      {item.data[field.columnName]}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Add / Update Data</h2>
          <div className="space-y-4">
            {schema.fields.map((field) => (
              <div key={field.columnName}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.columnName}
                </label>
                <input
                  type="text"
                  name={field.columnName}
                  value={newData[field.columnName] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}
            <button
              onClick={handleAddData}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {selectedData ? "Update Data" : "Add Data"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaContents;
