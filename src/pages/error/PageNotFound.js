import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Trang Không Tìm Thấy.
        </p>
        <p className="lead">
          Tài Nguyên Bạn Đang Cố Truy Cập Không Tồn Tài, Vui Lòng Kiểm Tra Và
          Thử Lại Hoặc Nhấn Vào Liên Kết Phía Dưới Để Quay Lại Trang Chủ.
        </p>
        <Link to="/dashboard/employees" className="btn btn-primary">
          Quay Về Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
