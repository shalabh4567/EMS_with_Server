import React, { useRef, useEffect } from "react";
import "./Homepage.css";
import scrollUp from "../../LandinPageImages/scroll-up.png";
import index from "../../LandinPageImages/index.png";
function Top() {
  const demo2 = useRef(null);

  const interval = () => {
    var date = new Date();
    var m = date.getMonth();
    var month = "";
    switch (m) {
      case 0: {
        month = "1";
        break;
      }
      case 1: {
        month = "2";
        break;
      }
      case 2: {
        month = "3";
        break;
      }
      case 3: {
        month = "4";
        break;
      }
      case 4: {
        month = "5";
        break;
      }
      case 5: {
        month = "6";
        break;
      }
      case 6: {
        month = "7";
        break;
      }
      case 7: {
        month = "8";
        break;
      }
      case 8: {
        month = "9";
        break;
      }
      case 9: {
        month = "10";
        break;
      }
      case 10: {
        month = "11";
        break;
      }
      case 11: {
        month = "12";
        break;
      }
    }

    demo2.current.innerHTML =
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "  |  " +
      date.getDate() +
      "-" +
      month +
      "-" +
      date.getFullYear();
  };

  useEffect(() => {
    const timer = setInterval(interval, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    //scroll
    <div id="top">
      <a id="ok" href="#top" className="arw">
        <img
          src={scrollUp}
          style={{ width: "30px", height: "30px", visibility: "visible" }}
        />
      </a>
      <div className="overall">
        <nav>
          <img
            src={index}
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              position: "fixed",
              top: "1%",
              left: "1%",
              visibility: "visible",
              zIndex: "1000",
            }}
          />
          <div className="dateTop">
            <b>
              <p id="demo2" ref={demo2}></p>
              <p id="demo1"></p>
            </b>
          </div>
          <div className="NavContainer">
            &nbsp; &nbsp;
            <div className="Insights">
              <a href="https://www.ey.com/en_in">Insights</a>
            </div>
            <div className="AboutUs">
              <a href="#">About Us</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default Top;
