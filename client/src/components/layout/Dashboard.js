import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

// CSS
import "../../assets/css/Dashboard.css";

const Dashboard = () => {
  // Array of blood unit availability
  const [bloodTable, setbloodTable] = useState([]);

  // Fetch blood stocks
  useEffect(() => {
    axios
      .get("http://localhost:3001/home")
      .then((response) => {
        setbloodTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blood stocks:", error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>BLOOD STOCK</h1>

      {bloodTable.length > 0 ? (
        <table className="blood-table">
          <thead>
            <tr>
              <th>BLOOD ID</th>
              <th>BLOOD GROUP</th>
              <th>UNIT</th>
            </tr>
          </thead>
          <tbody>
            {bloodTable.map((val, index) => (
              <tr key={index}>
                <td>{val.b_id}</td>
                <td>{val.blood_group}</td>
                <td>{val.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No blood stock data available.</p>
      )}
      
      <Footer />
    </div>
  );
};

export default Dashboard;
