const RequestClassHandler = (app, db) => {
  app.post("/request", (req, res) => {
    const { blood_group, unit, user_id } = req.body;
    const userBloodGroup=req.body.blood_group;

    if (!blood_group || !unit || !user_id) {
      return res.status(400).send({ message: "Invalid input. All fields are required." });
    }

    console.log(`Received Request - Blood Group: ${blood_group}, Unit: ${unit}, User ID: ${user_id}`);

    // Query to check stock availability
    const sqlSelect = "SELECT unit FROM blood_stocks WHERE userBloodGroup = ?"; 
    // Query to insert user request
    const sqlInsert = "INSERT INTO user_request (user_id, blood_group, unit) VALUES (?, ?, ?)";

    db.query(sqlSelect, [userBloodGroup], (err, stockResult) => {
      if (err) {
        console.error("Error fetching blood stock:", err);
        return res.status(500).send({ message: "Error fetching blood stock. Please try again later." });
      }

      if (!stockResult || stockResult.length === 0) { 
        return res.status(404).send({ message: "Blood group not found in stock." });
      }

      const availableUnits = stockResult[0].unit;
      console.log(availableUnits);

      if (unit > availableUnits) {
        return res.status(400).send({ message: "Insufficient stock available." });
      }

      db.query(sqlInsert, [user_id, blood_group, unit], (err) => {
        if (err) {
          console.error("Error processing request:", err);
          return res.status(500).send({ message: "Error processing request. Please try again later." });
        }

        res.send({ message: "Request accepted. Collect it from the blood bank." });
      });
    });
  });
};

export default RequestClassHandler;
