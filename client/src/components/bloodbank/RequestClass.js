import React, { Component } from "react";
import Axios from "axios";
import "../../assets/css/Request.css";

export default class RequestClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodGroup: [],
      req_blood: "A+",
      req_unit: 0,
      user_id: 1,
    };
  }

  componentDidMount() {
    // Predefined blood group options
    const bloodGroups = [
      { id: "A+", label: "A+" },
      { id: "A-", label: "A-" },
      { id: "B+", label: "B+" },
      { id: "B-", label: "B-" },
      { id: "AB+", label: "AB+" },
      { id: "AB-", label: "AB-" },
      { id: "O+", label: "O+" },
      { id: "O-", label: "O-" },
      { id: "PNull", label: "PNull" },
    ];
    this.setState({ bloodGroup: bloodGroups });
  }

  handleBloodGroupChange = (e) => {
    this.setState({ req_blood: e.target.value });
  };

  handleUnitChange = (e) => {
    this.setState({ req_unit: e.target.value });
  };

  handleUserIdChange = (e) => {
    this.setState({ user_id: e.target.value });
  };

  request = (e) => {
    e.preventDefault(); // Prevent page reload
    const { req_blood, req_unit, user_id } = this.state;

    // Log data for debugging
    console.log("Request Data:", { req_blood, req_unit, user_id });

    Axios.post("http://localhost:3001/request", {
      blood_group: req_blood,
      unit: req_unit,
      user_id: user_id,
    })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message); // Display server response
        }
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
        alert("Failed to submit request. Please try again later.");
      });
  };

  render() {
    const { bloodGroup, req_blood } = this.state;

    return (
      <div className="request">
        <form onSubmit={this.request}>
          <label>
            Blood Group: <br></br>
            <select
              value={req_blood}
              onChange={this.handleBloodGroupChange}
              aria-label="Select blood group"
            >
              {bloodGroup.map((blood) => (
                <option key={blood.id} value={blood.id}>
                  {blood.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Units:<br></br>
            <input
              type="number"
              placeholder="Enter units"
              onChange={this.handleUnitChange}
              aria-label="Enter units required"
            />
          </label>
          <label>
            Blood ID:<br></br>
            <input
              type="number"
              placeholder="Enter User ID"
              onChange={this.handleUserIdChange}
              aria-label="Enter User ID"
            />
          </label>
          <button type="submit">REQUEST</button>
        </form>
      </div>
    );
  }
}
