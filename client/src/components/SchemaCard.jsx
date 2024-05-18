import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDatabase, FaFont, FaCalendar, FaHashtag } from "react-icons/fa";

// Utility function to get the appropriate icon for a data type
const getIcon = (dataType) => {
  switch (dataType) {
    case "number":
      return <FaHashtag className="text-blue-500" />;
    case "text":
      return <FaFont className="text-green-500" />;
    case "date":
      return <FaCalendar className="text-yellow-500" />;
    default:
      return <FaDatabase className="text-gray-500" />;
  }
};

// eslint-disable-next-line react/prop-types
function SchemaCard({ data }) {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle card click and navigate to schema contents
  const handleCardClick = (id) => {
    navigate(`/schema/${id}`);
  };

  return (
    <div
      className="bg-white shadow-xl rounded-lg p-6 mb-4 w-full max-w-md m-4 cursor-pointer"
      onClick={() => handleCardClick(data[0]._id)}
    >
      {data.map((schema) => (
        <div key={schema._id} className="mb-4">
          <h2 className="text-xl font-bold">{schema.tableName}</h2>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">Fields:</h3>
            <ul className="list-disc pl-6">
              {schema.fields.map((field) => (
                <li key={field._id}>
                  <div className="flex items-center">
                    <div className="mr-2">{getIcon(field.dataType)}</div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {field.columnName}
                      </span>
                      <span className="ml-1 text-sm text-gray-600">
                        ({field.dataType})
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SchemaCard;
