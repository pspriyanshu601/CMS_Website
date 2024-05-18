import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function FieldPair({ onColumnNameChange, onDataTypeChange }) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
      <input
        type="text"
        placeholder="Column Name"
        onChange={onColumnNameChange}
        className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 flex-grow"
      />
      <select
        onChange={onDataTypeChange}
        className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Data Type</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        {/* Add more data types as needed */}
      </select>
    </div>
  );
}

function NewSchema() {
  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState([{ columnName: "", dataType: "" }]);

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  const handleColumnNameChange = (e, index) => {
    const newFields = [...fields];
    newFields[index].columnName = e.target.value;
    setFields(newFields);
  };

  const handleDataTypeChange = (e, index) => {
    const newFields = [...fields];
    newFields[index].dataType = e.target.value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { columnName: "", dataType: "" }]);
  };

  const handleSubmit = async () => {
      // Send table name and fields as JSON
      const stringifiedFields = JSON.stringify(fields);
      const data = {
        userId: "6644ceceaacf70ef12faab4f",
        tableName,
        fields: stringifiedFields,
      };
    console.log(JSON.stringify(data));
      // Here you can send the data to your backend or perform any other action
      const link = import.meta.env.VITE_SITE_LINK + "/user/createUserSchema";
      const response = await axios.post(link, data);
      console.log(response);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
          <Navbar />
          <br />
          <br />
          <br />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center font-serif">Create Table</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Table Name"
            value={tableName}
            onChange={handleTableNameChange}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
          />
        </div>
        {fields.map((field, index) => (
          <FieldPair
            key={index}
            onColumnNameChange={(e) => handleColumnNameChange(e, index)}
            onDataTypeChange={(e) => handleDataTypeChange(e, index)}
          />
        ))}
        <div className="flex justify-between">
          <button
            onClick={handleAddField}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Another Field
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewSchema;
