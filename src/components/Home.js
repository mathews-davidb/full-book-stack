import { Link, useHistory } from "react-router-dom";
import "./Components.css";
import video from "./media/hm.mp4";

const Home = (props) => {
  const history = useHistory();
  return (
    <div className="video-container">
      <video loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="text">
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
          }}
        >
          Where Endless Possibilities Await
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
