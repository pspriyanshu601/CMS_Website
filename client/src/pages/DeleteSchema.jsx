// DeleteSchema.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const DeleteSchema = () => {
  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SITE_LINK}/user/getUserSchema`,
          {
            params: { userId: "6644ceceaacf70ef12faab4f" },
          }
        );
        setSchemas(response.data.data);
      } catch (error) {
        console.error("Error fetching schemas:", error);
      }
    };

    fetchSchemas();
  }, []);

  const handleDelete = async (schemaId) => {
    if (
      window.confirm(
        "Deleting the schema will delete all its contents. Are you sure you want to proceed?"
      )
    ) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_SITE_LINK}/user/deleteSchema/${schemaId}`
        );
        // Refresh the list of schemas after deletion
        const response = await axios.get(
          `${import.meta.env.VITE_SITE_LINK}/user/getUserSchema`
        );
        setSchemas(response.data.data);
      } catch (error) {
        console.error("Error deleting schema:", error);
      }
    }
  };

  return (
    <div>
          <Navbar />
          <br />
          <br />
          <br />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Delete Schema</h1>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemas.map((schema) => (
            <li key={schema._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{schema.tableName}</h2>
              <button
                onClick={() => handleDelete(schema._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeleteSchema;
