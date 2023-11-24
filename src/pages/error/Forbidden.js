import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  const { setIsLogin } = useContext(AuthContext);
  useEffect(() => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
  }, []);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">403</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Bạn Không Có Đủ Thẩm Quyền.
        </p>
        <p className="lead">
          Bạn không có quyền truy cập vào tài nguyên này! Vui lòng không cố truy
          cập vào tài nguyên này khi không được cho phép, nếu không bạn sẽ chịu
          toàn bộ trách nhiệm
        </p>
        <Link to="/" className="btn btn-primary">
          Quay Về Trang Đăng Nhập
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
