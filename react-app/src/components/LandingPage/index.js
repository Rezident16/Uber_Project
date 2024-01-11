import { useState } from "react";
import "./landingpage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function LandingPage() {
  const [scootClassName, setScootClassName] = useState("");
  const history = useHistory();

  function scootButton() {
    setScootClassName("scoot-away");
    setTimeout(() => {
      history.push("/restaurants");
    }, 1000);
  }

  return (
    <>
      <h1 id="welcome">Welcome to SavoryScoot</h1>
      <h2 id="sub-welcome">A full stack project inspired by UberEats</h2>

      <img
        id="scoot-logo"
        className={scootClassName}
        src="https://savoryscoot.s3.amazonaws.com/src-images/SavoryScooterNoLeaves.svg"
        alt=""
      />

      <button id="scoot-button" onClick={scootButton}>
        Start Scooting
      </button>

      <p className="p-text">
        Users can take a look at different restaurants offering delivery
        services local to them, place orders, and even list their own
        restaurants to offer delivery services as well.
      </p>

      <ul>
        <li>
          <ol>
            <li className="name-li">Andrei Vorobev</li>
            <li>
              <a target="_blank" href="https://github.com/Rezident16">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/andreivorobev/"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ol>
        </li>
        <li>
          <ol>
            <li className="name-li">Brian Stokes</li>
            <li>
              <a target="_blank" href="https://github.com/bcstokes4">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.linkedin.com/in/brian-stokes-86a842124/">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ol>
        </li>
        <li>
          <ol>
            <li className="name-li">Mason Austin</li>
            <li>
              <a target="_blank" href="https://github.com/masonaustin42">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/mason-austin-a1b568240/"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ol>
        </li>
        <li>
          <ol>
            <li className="name-li">Zohaib Rajan</li>
            <li>
              <a target="_blank" href="https://github.com/zohaibrajan">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/zohaib-rajan-718198216/"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ol>
        </li>
      </ul>
    </>
  );
}

export default LandingPage;
