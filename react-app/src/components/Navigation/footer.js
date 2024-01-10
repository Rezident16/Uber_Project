import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-left-container">
        <span>
          <span style={{ fontWeight: 500 }}>Savory</span>
          <span style={{ fontWeight: 600 }}>Scoot</span>
        </span>
        <Link to="/">Go to Homepage </Link>
      </div>

      <ul className="footer-right-container">
        <li>
          <ol className="individual-links-container">
            <li className="name-li-footer">Andrei Vorobev</li>
            <li className="footer-links">
              <a target="_blank" href="https://github.com/Rezident16">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li className="footer-links">
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
          <ol className="individual-links-container">
            <li className="name-li-footer">Brian Stokes</li>
            <li className="footer-links">
              <a target="_blank" href="https://github.com/bcstokes4">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li className="footer-links">
              <a target="_blank" href="https://linkedin.com/in/brian-stokes-86a842124">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ol>
        </li>
        <li>
          <ol className="individual-links-container">
            <li className="name-li-footer">Mason Austin</li>
            <li className="footer-links">
              <a target="_blank" href="https://github.com/masonaustin42">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li className="footer-links">
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
          <ol className="individual-links-container">
            <li className="name-li-footer">Zohaib Rajan</li>
            <li className="footer-links">
              <a target="_blank" href="https://github.com/zohaibrajan">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li className="footer-links">
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
    </div>
  );
}

export default Footer;
