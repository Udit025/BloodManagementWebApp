import bb1 from "../../assets/img/ppt7.jpg";
import bb2 from "../../assets/img/ppt5.jpg";
import bb3 from "../../assets/img/ppt6.jpg";
import "../../assets/css/Homepage.css"

const HomePage = () => {
  return (
    <div>
      <div className="container mt-4">
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slidec-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="item active">
              <img
                src={bb1}
                alt="bimg"
                style={{ width: "600%", height: "420px" }}
              />
            </div>

            <div className="item">
              <img
                src={bb2}
                alt="bimg"
                style={{ width: "600%", height: "420px" }}
              />
            </div>

            <div className="item">
              <img
                src={bb3}
                alt="bimg"
                style={{ width: "600%", height: "420px" }}
              />
            </div>
          </div>
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;