const DashboardHandler = (app, db) => {
  app.get("/home", (req, res) => {
    // Query
    const sqlSelect = "SELECT b_id, userBloodGroup AS blood_group, unit FROM blood_stocks;";

    // Database query
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err + " **ERROR FETCHING BLOOD STOCKS**");
        res.status(500).send({ message: "Error fetching blood stocks" });
      } else {
        res.send(result);
      }
    });
  });
};

export default DashboardHandler;
