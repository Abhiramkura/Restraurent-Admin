import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const AdminHeader = (props) => {
  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    history.replace("/adminlogin");
  };

  return (
    <nav className="nav-header">
      <div>
        <div className="nav-bar-large-container">
          <div>
            <Link to="/">
              <img
                className="website-logo"
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
                alt="website logo"
              />
            </Link>
          </div>
          <div>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(AdminHeader);
