import Footer from "components/partial/Footer";
import Header from "components/partial/Header";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../../auth/SignUp";
import EmployeeList from "./EmployeeList";
import StatEmployee from "./StatEmployee";

const EmployeeDashboard = () => {
  // Check if user is login
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate(`/`);
    }
  }, [isLogin]);

  return (
    <div className="container-fluid">
      <Header />
      <div
        className="border shadow"
        style={{ marginTop: 70, minHeight: "80vh" }}
      >
        <ul className="nav nav-tabs nav-justified" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#query">
              <i className="fa-solid fa-info mx-1 text-success"></i>
              <span className="text-success text-text-uppercase mx-2 fw-bold">
                Thao Tác
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#create">
              <i className="fa-solid fa-plus"></i>
              <span className="text-success text-text-uppercase mx-2 fw-bold">
                Tạo Mới
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#stats">
              <i className="fa-solid fa-chart-simple fw-bold"></i>
              <span className="text-success text-text-uppercase mx-2">
                Thống Kê
              </span>
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="query" className="container-fluid tab-pane active">
            <EmployeeList />
          </div>
          <div id="create" className="container-fluid tab-pane fade">
            <SignUp />
          </div>
          <div id="stats" className="container-fluid tab-pane fade">
            <StatEmployee />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeDashboard;
