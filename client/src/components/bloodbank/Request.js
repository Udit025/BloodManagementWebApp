import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../../assets/css/Request.css";

const Request = () => {
  // State variables
  const [bloodTable, setBloodTable] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [requestUnit, setRequestUnit] = useState(0);

  // Fetch blood stock data on component mount
  useEffect(() => {
    Axios.get("http://localhost:3001/home")
      .then((response) => {
        setBloodTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blood table data:", error);
      });
  }, []);

  const requestBlood = (e) => {
    e.preventDefault(); // Prevent form submission

    if (!bloodGroup || requestUnit <= 0) {
      alert("Please select a valid blood group and enter a valid unit.");
      return;
    }

    Axios.post("http://localhost:3001/request", {
      bloodGroup: bloodGroup,
      requestUnit: requestUnit,
    })
      .then((response) => {
        alert(response.data.message || "Blood request submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting blood request:", error);
        alert("Failed to submit blood request. Please try again later.");
      });
  };

  return (
    <div className="request">
      <h3 className="request-title">Request Blood</h3>

      <table className="blood-table">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {bloodTable.map((val) => (
            <tr key={val.b_id}>
              <td>{val.blood_group}</td>
              <td>{val.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="request-form" onSubmit={requestBlood}>
        <div className="form-group">
          <label htmlFor="bloodgroup">Blood Group:</label>
          <select
            id="bloodgroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="form-control"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="PNull">P Null</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="units">Units:</label>
          <input
            id="units"
            type="number"
            placeholder="Enter Units"
            value={requestUnit}
            onChange={(e) => setRequestUnit(e.target.value)}
            className="form-control"
            min="1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default Request;
