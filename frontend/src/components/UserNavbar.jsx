import { Link, useNavigate } from "react-router-dom";

function UserNavbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("userToken");

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          MERN Blog
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            {

              user ?

              <>

                <li className="nav-item">

                  <span className="nav-link">

                    👤 {user.name}

                  </span>

                </li>

                <li className="nav-item">

                  <button
                    className="btn btn-danger ms-2"
                    onClick={logout}
                  >

                    Logout

                  </button>

                </li>

              </>

              :

              <>

                <li className="nav-item">

                  <Link
                    className="btn btn-primary ms-2"
                    to="/login"
                  >

                    Login

                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="btn btn-success ms-2"
                    to="/register"
                  >

                    Register

                  </Link>

                </li>

              </>

            }

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default UserNavbar;