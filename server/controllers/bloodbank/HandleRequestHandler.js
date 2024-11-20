const HandleRequestHandler = (app, db) => {
  // Route to fetch all user requests
  app.get("/login/emp/hr", (req, res) => {
    const sqlSelect = "SELECT * FROM user_request";

    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.error("**ERROR**", err);
        return res.status(500).send({ error: "Error fetching user requests" });
      }

      res.status(200).send(result);
    });
  });

  // Route to handle a delete request
  app.delete("/login/emp/hr/:req_id", (req, res) => {
    const req_id = req.params.req_id;

    // Queries
    const sqlSelect1 = "SELECT * FROM user_request WHERE req_id = ?";
    const sqlSelect2 = "SELECT * FROM blood_stocks WHERE UserBloodGroup = ?";
    const sqlUpdate = "UPDATE blood_stocks SET unit = ? WHERE UserBloodGroup = ?";
    const sqlDelete = "DELETE FROM user_request WHERE req_id = ?";

    // Step 1: Fetch the request details
    db.query(sqlSelect1, [req_id], (err, requestResult) => {
      if (err) {
        console.error("**ERROR1**", err);
        return res.status(500).send({ error: "Error fetching request details" });
      }

      if (requestResult.length === 0) {
        return res.status(404).send({ error: "Request not found" });
      }

      const { blood_group: reqBloodGroup, unit: reqUnit } = requestResult[0];

      // Step 2: Check blood stock for the requested blood group
      db.query(sqlSelect2, [reqBloodGroup], (err, stockResult) => {
        if (err) {
          console.error("**ERROR2**", err);
          return res.status(500).send({ error: "Error fetching blood stock details" });
        }

        if (stockResult.length === 0) {
          return res.status(404).send({ error: "Blood group stock not found" });
        }

        const stockUnit = stockResult[0].unit;

        // Check if stock is sufficient
        if (reqUnit > stockUnit) {
          return res.status(400).send({ message: "INSUFFICIENT STOCKS!" });
        }

        const leftUnit = stockUnit - reqUnit;

        // Step 3: Update the blood stock
        db.query(sqlUpdate, [leftUnit, reqBloodGroup], (err) => {
          if (err) {
            console.error("**ERROR3**", err);
            return res.status(500).send({ error: "Error updating blood stock" });
          }

          // Step 4: Delete the user request
          db.query(sqlDelete, [req_id], (err) => {
            if (err) {
              console.error("**ERROR4**", err);
              return res.status(500).send({ error: "Error deleting the request" });
            }

            res.status(200).send({ message: "REQUEST SERVED!" });
          });
        });
      });
    });
  });
};

export default HandleRequestHandler;
