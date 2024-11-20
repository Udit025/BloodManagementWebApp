const UserRegisterHandler = (app, db) => {
  app.post("/reg/usr", (req, res) => {
    // Variables from the request body
    const userFName = req.body.userFName;
    const userAge = req.body.userAge;
    const userGender = req.body.userGender;
    const userBloodGroup = req.body.userBloodGroup;
    const userPhone = req.body.userPhone;
    const userMail = req.body.userMail;
    const userPlace = req.body.userPlace;
    const userUserName = req.body.userUserName;
    const userPassword = req.body.userPassword;

    // SQL queries
    const sqlInsert1 =
      "INSERT INTO user_details (userFName, userAge, userGender, userBloodGroup, userPhone, userMail, userPlace) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const sqlInsert2 =
      "INSERT INTO user_login (user_id, userUserName, userPassword) VALUES (?, ?, ?)";
    const sqlInsert3 = "INSERT INTO user_health (user_id) VALUES(?)";
    const sqlSelectBloodGroup =
      "SELECT unit FROM blood_stocks WHERE userBloodGroup = ?";
    const sqlUpdateBloodStocks =
      "UPDATE blood_stocks SET unit = unit + 1 WHERE userBloodGroup = ?";
    const sqlInsertBloodStocks =
      "INSERT INTO blood_stocks (userBloodGroup, unit) VALUES (?, 1)";
    const sqlDelete1 = "DELETE FROM user_details WHERE user_id = ?";
    const sqlDelete2 = "DELETE FROM user_health WHERE user_id = ?";

    // Start the registration process
    db.query(
      sqlInsert1,
      [
        userFName,
        userAge,
        userGender,
        userBloodGroup,
        userPhone,
        userMail,
        userPlace,
      ],
      (err, result) => {
        if (err) {
          console.log(err + " **ERROR INSERTING USER**");
          res.status(500).send({ message: "Failed to register user" });
        } else {
          console.log(result);
          const user_id = result.insertId;

          // Insert into user_login
          db.query(
            sqlInsert2,
            [user_id, userUserName, userPassword],
            (err, result1) => {
              if (err) {
                console.log(err + " **ERROR INSERTING TO USER-LOGIN**");

                // Rollback: Delete from user_details
                db.query(sqlDelete1, [user_id], (err) => {
                  if (err) console.log(err);
                  else console.log("**DELETED DUE TO DUPLICATION**");
                });

                res.status(400).send({ message: "Username already exists" });
              } else {
                // Insert into user_health
                db.query(sqlInsert3, [user_id], (err, result2) => {
                  if (err) {
                    console.log(err + " **ERROR INSERTING TO USER-HEALTH**");

                    // Rollback: Delete from user_health and user_details
                    db.query(sqlDelete2, [user_id], (err) => {
                      if (err) console.log(err);
                    });
                    db.query(sqlDelete1, [user_id], (err) => {
                      if (err) console.log(err);
                    });

                    res.status(500).send({
                      message: "Failed to register user",
                    });
                  } else {
                    // Check if blood group exists in blood_stocks
                    db.query(
                      sqlSelectBloodGroup,
                      [userBloodGroup],
                      (err, result3) => {
                        if (err) {
                          console.log(
                            err + " **ERROR CHECKING BLOOD-STOCKS**"
                          );
                          res.status(500).send({
                            message: "Failed to register user",
                          });
                        } else if (result3.length > 0) {
                          // Blood group exists, update the unit
                          db.query(
                            sqlUpdateBloodStocks,
                            [userBloodGroup],
                            (err, result4) => {
                              if (err) {
                                console.log(
                                  err + " **ERROR UPDATING BLOOD-STOCKS**"
                                );

                                // Rollback previous steps if needed
                                db.query(sqlDelete2, [user_id], (err) => {
                                  if (err) console.log(err);
                                });
                                db.query(sqlDelete1, [user_id], (err) => {
                                  if (err) console.log(err);
                                });

                                res.status(500).send({
                                  message: "Failed to register user",
                                });
                              } else {
                                console.log(
                                  "**BLOOD STOCKS UPDATED SUCCESSFULLY**"
                                );
                                res.status(200).send({
                                  message: `User registration successful! Your User Id is ${user_id}`,
                                });
                              }
                            }
                          );
                        } else {
                          // Blood group doesn't exist, insert new entry
                          db.query(
                            sqlInsertBloodStocks,
                            [userBloodGroup],
                            (err, result5) => {
                              if (err) {
                                console.log(
                                  err + " **ERROR INSERTING TO BLOOD-STOCKS**"
                                );

                                // Rollback previous steps if needed
                                db.query(sqlDelete2, [user_id], (err) => {
                                  if (err) console.log(err);
                                });
                                db.query(sqlDelete1, [user_id], (err) => {
                                  if (err) console.log(err);
                                });

                                res.status(500).send({
                                  message: "Failed to register user",
                                });
                              } else {
                                console.log(
                                  "**BLOOD STOCKS INSERTED SUCCESSFULLY**"
                                );
                                res.status(200).send({
                                  message: "User registration successful!",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        }
      }
    );
  });
};

export default UserRegisterHandler;
