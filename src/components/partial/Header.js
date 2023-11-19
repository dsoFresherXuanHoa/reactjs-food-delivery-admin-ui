import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  // Get User
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle logout
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    toast.success("Đăng xuất thành công!");
    setIsLogin(false);
    setCurrentUser({});
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
                <Link className="nav-link" to="/employees">
                  <i className="fa-solid fa-briefcase me-1"></i>
                  <span className="me-1 fw-bold text-text-uppercase">
                    Nhân Viên
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/goods">
                  <i className="fa-solid fa-bowl-food mx-1"></i>
                  <span className="mx-1 fw-bold text-text-uppercase">Món</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  <i className="fa-solid fa-tablet mx-1"></i>
                  <span className="mx-1 fw-bold text-text-uppercase">
                    Phân Loại Món
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/revenues">
                  <i className="fa-solid fa-money-bill mx-1"></i>
                  <span className="mx-1 fw-bold text-text-uppercase">
                    Đơn Hàng
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <Link className="nav-link" onClick={handleSignOut} to="/">
            <i className="fa-regular fa-hand"></i>
            <span className="mx-1 fw-bold text-success mx-1">
              {currentUser?.fullName ? currentUser.fullName.split(" ")[0] : ""}
            </span>
            <i className="fa-solid fa-right-from-bracket mx-3"></i>
            <span className="mx-1 fw-bold">Đăng Xuất</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
