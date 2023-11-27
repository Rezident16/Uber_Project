import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./PageNotFound.css";
function PageNotFound() {
  return (
    <>
      <h1 id="not-found-heading">Page Not Found</h1>
      <h2 id="not-found-subheading">Error 404</h2>
      <div id="not-found-container">
        <img
          id="not-found-scoot-logo"
          src="https://savoryscoot.s3.amazonaws.com/src-images/SavoryScooterNoLeaves.svg"
          alt="scooter"
        />
        <img
          id="stop-sign"
          src="https://savoryscoot.s3.amazonaws.com/src-images/stop-sign.png"
          alt="stop sign"
        />
      </div>
      <Link id="not-found-link" to="/restaurants">
        Back to Restaurants
      </Link>
    </>
  );
}

export default PageNotFound;
