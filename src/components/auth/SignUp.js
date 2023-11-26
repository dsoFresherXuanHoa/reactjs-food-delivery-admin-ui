import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

const SignUp = () => {
  // Sign Up:
  const [fullName, setFullName] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState(false);
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(2);
  const [secretKey, setSecretKey] = useState();
  const [isAllowSignUp, setIsAllowSignUp] = useState(true);
  const { setIsLoading } = useContext(AuthContext);

  // Get used Email
  const [usedEmail, setUsedEmail] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/employees/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUsedEmail(res.data.data.map((v) => v.account.email));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const confirm = window.confirm(`Xác nhận thông tin là chính xác?`);
    if (confirm) {
      if (
        fullName.length === 0 ||
        tel.length === 0 ||
        gender.length === 0 ||
        email.length === 0 ||
        roleId.length === 0
      ) {
        toast.error("Vui lòng nhập đầy đủ các thông tin!");
      } else if (!validator.isEmail(email)) {
        toast.error("Vui lòng nhập địa chỉ Email hợp lệ!");
      } else if (!validator.isMobilePhone(tel, "vi-VN")) {
        toast.error("Vui lòng nhập số điện thoại chính xác!");
      } else if (usedEmail.includes(email)) {
        toast.info("Email đã được sử dụng, hãy sử dụng Email khác!");
      } else {
        toast.info(
          "Đang thực hiện cấp tài khoản cho nhân viên, vui lòng chờ..."
        );
        setIsAllowSignUp(false);
        axios
          .post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/sign-up`,
            {
              fullName,
              tel,
              gender,
              email,
              roleId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            setIsLoading(true);
            setIsAllowSignUp(true);
            setSecretKey(res.data.data.secretCode);
            toast.success(
              "Đã cấp tài khoản mới cho nhân viên, mã bí mật được gửi qua Email!"
            );
          })
          .catch((err) => {
            setIsAllowSignUp(true);
            toast.error("Có lỗi xảy ra! Vui lòng thử lại sau!");
          });
      }
    }
  };

  // Handle Reset
  const handleReset = () => {
    setFullName("");
    setTel("");
    setGender(false);
    setRoleId(2);
    setEmail("");
  };

  // Download Employee Information

  return (
    <form className="p-3 border rounded-3 shadow m-1 container-fluid">
      <span>
        <i className="m-2 fa-solid fa-user fa-2x text-success"></i>
        <span className="mx-3 text-uppercase text-success fw-bold">
          Cấp tài Khoản Mới Cho Nhân Viên và Phục Vụ Bếp:
        </span>
        <p className="mx-3 text-info">
          <i className="mx-3 fa-solid fa-info"></i>
          Vui lòng nhập đúng thông tin được nhân viên, phục vụ bếp cung cấp trên
          phiếu thông tin ứng viên:
        </p>
      </span>

      <div className="form-floating my-3">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Nhập họ tên nhân viên:"
          name="fullName"
          required
        />
        <label htmlFor="tfFullName">Họ Tên Nhân Viên: </label>
      </div>

      <div className="row">
        <div className="col form-floating my-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Nhập địa chỉ Email tài khoản:"
            name="email"
            required
          />
          <label htmlFor="tfEmail" className="mx-3">
            Địa Chỉ Email Tài Khoản:{" "}
          </label>
        </div>

        <div
          className="col form-floating my-3"
          onChange={(e) => parseInt(e.target.value)}
        >
          <select
            className="form-select"
            id="slcRole"
            name="roleId"
            onChange={(e) => setRoleId(parseInt(e.target.value))}
          >
            <option value={2}>Nhân Viên Phục Vụ Nhà Hàng</option>
            <option value={3}>Nhân Viên Phục Vụ Bếp</option>
          </select>
          <label htmlFor="slcRole" className="form-label mx-2">
            Chọn Công Việc Của Nhân Viên:
          </label>
        </div>
      </div>

      <div className="row">
        <div className="col form-floating my-3">
          <input
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            type="tel"
            className="form-control"
            placeholder="Nhập số điện thoại nhân viên:"
            name="tel"
            required
          />
          <label htmlFor="tfTel" className="mx-3">
            Số Điện Thoại:{" "}
          </label>
        </div>

        <div className="col form-floating my-3">
          <select
            className="form-select"
            id="slcGender"
            name="gender"
            onChange={(e) => setGender(e.target.value === "true")}
          >
            <option value={false}>Nam</option>
            <option value={true}>Nữ</option>
          </select>
          <label htmlFor="slcGender" className="form-label mx-2">
            Chọn Giới Tính Nhân Viên:
          </label>
        </div>
      </div>

      <div className="d-grid d-flex">
        <button
          hidden={!secretKey}
          className="flex-fill btn btn-danger text-white text-uppercase"
        >
          Mã Bí Mật Của Nhân Viên: {secretKey}
        </button>
      </div>

      <div className="d-grid d-flex">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isAllowSignUp}
          className="m-2 flex-fill btn btn-primary btn-block"
        >
          Đăng Ký
        </button>
        <button
          type="reset"
          onClick={handleReset}
          className="m-2 flex-fill btn btn-primary btn btn-warning text-white"
        >
          Làm Lại
        </button>
      </div>
    </form>
  );
};

export default SignUp;
