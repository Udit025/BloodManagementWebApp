import React from "react";
import p from "../../assets/img/p.png";
import m from "../../assets/img/m.png";
import "../../assets/css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-section">
        <h1>About Us</h1>
        <p>Here is some information about our page</p>
        <p color="black">
          We are designed to help manage the collection, storage, and
          distribution of donated blood. The website allows registered
          organizations to access a database of potential donors and manage
          their own blood donation programs. This enables efficient and safe
          donation processes, while giving donors the ability to track their
          donations and manage their accounts. The website also provides
          detailed information on the different types of blood donations, as
          well as the latest news and updates regarding the blood donation
          process.
        </p>
      </div>

      <h2 className="about-heading black-color">Our Team</h2>
      <div className="team-members">
        <div className="team-member">
          <div className="card">
            <img src={p} alt="Purna" className="card-img" />
            <div className="card-container">
              <h2>Purna</h2>
              <p className="title">CEO & Founder</p>
              <p>purna@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="team-member">
          <div className="card">
            <img src={m} alt="Madhu" className="card-img" />
            <div className="card-container">
              <h2>Madhu</h2>
              <p className="title">Art Director</p>
              <p>madhu@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
