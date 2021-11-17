import { Link, useHistory } from "react-router-dom";
import "./Components.css";
import video from "./media/hm.mp4";

const Home = (props) => {
  const history = useHistory();
  return (
    <div className="video-container">
      {/* <video loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video> */}
      <div className="text">
        <h1
          style={{
            fontFamily: "serif",
            fontSize: "3em",
            color: "#DAA520",
            textDecoration: "None",
          }}
        >
          FULL BOOKSTACK
        </h1>
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
