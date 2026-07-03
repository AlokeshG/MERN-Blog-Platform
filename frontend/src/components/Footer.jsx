import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">

        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">MERN Blog</h4>

            <p>
              A modern blogging platform built using
              MongoDB, Express.js, React.js and Node.js.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">

            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/search"
                >
                  Search
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}
          <div className="col-md-4 mb-4">

            <h5>Categories</h5>

            <ul className="list-unstyled">

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/category/Technology"
                >
                  💻 Technology
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/category/Programming"
                >
                  📚 Programming
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/category/AI"
                >
                  🤖 AI
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/category/Web Development"
                >
                  🌐 Web Development
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <hr className="border-light" />

        {/* Social Icons */}
        <div className="text-center mb-3">

          <a
            href="https://facebook.com"
            className="text-white fs-4 me-3"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>

          <a
            href="https://instagram.com"
            className="text-white fs-4 me-3"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://linkedin.com"
            className="text-white fs-4 me-3"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com"
            className="text-white fs-4"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

        </div>

        <div className="text-center">
          <p className="mb-0">
            © 2026 MERN Blog | Built with ❤️ using MERN Stack
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;