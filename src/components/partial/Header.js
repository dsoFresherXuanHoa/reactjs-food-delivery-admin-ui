import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  // Handle logout
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    toast.success("Đăng xuất thành công!");
    setIsLogin(false);
    navigate("/auth/sign-in");
  };
  return (
    <div className="container border shadow" style={{ maxHeight: 70 }}>
      <nav className="navbar navbar-expand-sm bg-light navbar-light fixed-top d-flex justify-content-around">
        <Link className="navbar-brand text-success" to="/">
          <i className="fa-solid fa-cookie-bite fa-2x"></i>
        </Link>
        <div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/employees">
                  <i className="fa-solid fa-briefcase me-1"></i>
                  <span className="me-1 fw-bold text-text-uppercase">
                    Nhân Viên
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/goods">
                  <i className="fa-solid fa-bowl-food mx-1"></i>
                  <span className="mx-1 fw-bold text-text-uppercase">Món</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/categories">
                  <i className="fa-solid fa-tablet mx-1"></i>
                  <span className="mx-1 fw-bold text-text-uppercase">
                    Phân Loại Món
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/revenues">
                  <i className="fa-solid fa-money-bill mx-1"></i>
                  <span className="mx-1 fw-bold text-text-uppercase">
                    Doanh Thu
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <Link className="nav-link" onClick={handleSignOut} to="/">
            <i className="fa-solid fa-right-from-bracket mx-1"></i>
            <span className="mx-1 fw-bold text-text-uppercase">Đăng Xuất</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
