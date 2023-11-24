import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import validator from "validator";

const SignIn = () => {
  const payload = {
    email: "dso.intern.xuanhoa@gmail.com",
    password: "dso.intern.xuanhoa@gmail.com",
  };
  const [formData, setFormData] = useState(payload);
  const navigate = useNavigate();

  // Check if user is login
  const { isLogin, setIsLogin } = useContext(AuthContext);
  useEffect(() => {
    if (isLogin) {
      navigate(`/employees`);
    }
  }, [isLogin]);

  // Handle submit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email.length === 0 || formData.password.length === 0) {
      toast.info("Vui lòng nhập đủ Email và mật khẩu!");
    } else if (!validator.isEmail(formData.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ!");
    } else if (
      !validator.isLength(formData.password, {
        min: 8,
        max: 32,
      })
    ) {
      toast.error("Mật khẩu chứa ít nhất 8 kí tự và tối đa 32 ký tự!");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_API_URL}/auth/sign-in`, formData)
        .then((res) => {
          const accessToken = res.data.data.token;
          localStorage.setItem("accessToken", accessToken);
          toast.success("Đăng nhập thành công!");
          setIsLogin(true);
          navigate(`/employees`);
        })
        .catch((err) => {
          toast.error("Email hoặc mật khẩu khồng đúng, vui lòng thử lại!");
        });
    }
  };
  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="container-fluid w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <form className="p-3 border rounded-3 shadow w-50">
        <span>
          <i className="fa-solid fa-right-to-bracket fa-2x text-success"></i>
          <span className="mx-3 text-uppercase text-success fw-bold">
            Đăng Nhập Quản Lý Nhà Hàng:
          </span>
        </span>
        <div className="form-floating my-3">
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="form-control"
            id="tfEmail"
            name="email"
            placeholder="Nhập địa chỉ Email tài khoản để đăng nhập:"
            required
          />
          <label htmlFor="tfEmail">Email Tài Khoản: </label>
        </div>

        <div className="form-floating my-3">
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="form-control"
            id="tfPassword"
            placeholder="Nhập mật khẩu tài khoản để đăng nhập:"
            name="password"
            required
          />
          <label htmlFor="tfPassword">Mật Khẩu Tài Khoản: </label>
        </div>

        <div className="d-grid d-flex">
          <button
            type="submit"
            onClick={handleSubmit}
            className="m-2 flex-fill btn btn-primary btn-block"
          >
            Đăng Nhập
          </button>
          <button
            onClick={handleReset}
            type="reset"
            className="m-2 flex-fill btn btn-primary btn btn-warning text-white"
          >
            Làm Lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
