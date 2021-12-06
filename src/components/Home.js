import { Link, useHistory } from "react-router-dom";
import "./Components.css";
import video from "./media/hm.mp4";
import image from "./media/altbackground2.png";

const Home = (props) => {
  const history = useHistory();
  return (
    <div className="video-container">
      {/* <video loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video> */}
      <img src={image} style={{ height: "auto", width: "100%" }} />
      <div className="text" style={{ marginTop: "-6em" }}>
        <img
          style={{ height: "200px", marginTop: "-4.3rem" }}
          src={"/images/lgw3.png"}
        ></img>
        <h2
          style={{
            fontFamily: "serif",

            color: "#faebd7",
            textDecoration: "None",
            fontStyle: "italic",
            fontSize: "1.5em",
          }}
        >
          “You can never get a cup of tea large enough or a book long enough to
          suit me.” <br></br>– C.S. Lewis
        </h2>

        <button
          className="button button2"
          onClick={() => {
            history.push("/register");
          }}
        >
          <a
            href="/register"
            style={{ textDecoration: "none", color: "#e0bc75" }}
          >
            REGISTER NOW
          </a>
        </button>
      </div>
    </div>
  );
};

export default Home;
