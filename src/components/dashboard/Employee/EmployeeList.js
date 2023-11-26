import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
  // Check User Permission
  const navigate = useNavigate();

  // Export
  const [exportData, setExportData] = useState([]);

  // Get Product List
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/employees/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const targetEmployee = res.data.data?.filter((e) => e.ID !== 0);
        setIsLoading(false);
        setEmployees(targetEmployee);
        const exportData = employees.map((v) => ({
          id: v.ID,
          createdTime: v.CreatedAt,
          deletedTime: v.DeletedAt,
          email: v.account.email,
          fullName: v.fullName,
          tel: v.tel,
          gender: v.gender,
          role:
            v.account.roleId === 1
              ? "Quản Lý"
              : v.account.roleId === 2
              ? "Phục Vụ"
              : "Bếp",
        }));
        setExportData(exportData);
      })
      .catch((err) => {
        const statusCode = err.response.data.statusCode;
        if (statusCode === 403) {
          navigate("/forbidden");
        }
      });
  }, [isLoading]);

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

  // Paging
  const [offset, setOffset] = useState(0);

  // Reset Password
  const handleResetPassword = (email) => {
    const accessToken = localStorage.getItem("accessToken");
    const confirm = window.confirm(
      `Xác nhận khôi phục mật khẩu về mặc định cho tài khoản: ${email}`
    );
    if (confirm) {
      axios
        .patch(
          `${process.env.REACT_APP_BASE_API_URL}/auth/reset-password`,
          {
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("Đã khôi phục mật khẩu cho tài khoản về mặt định!");
        })
        .catch((err) => {
          toast.error(
            "Khồng thể khôi phục mật khẩu cho tài khoản! Vui lòng thử lại sau!"
          );
        });
    }
  };

  // Delete Account
  const handleDelete = (id, email) => {
    const accessToken = localStorage.getItem("accessToken");
    const confirm = window.confirm(
      `Xác nhận xóa quyền truy cập cho tài khoản: ${email}`
    );
    if (confirm) {
      axios
        .delete(`${process.env.REACT_APP_BASE_API_URL}/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(true);
          toast.success("Đã xóa quyền truy cập của tài khoản!");
        })
        .catch((err) => {
          toast.error(
            "Khồng thể xóa quyền truy cập của tài khoản! Vui lòng thử lại sau!"
          );
        });
    }
  };

  // Sort
  const [sortDisable, setSortDisable] = useState(true);

  // Filter
  const [selectedGender, setSelectedGender] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedPosition, setSelectedPosition] = useState();

  return (
    <div className="container-fluid table-responsive p-3 border rounded-3 shadow m-1">
      {/* Search */}
      <div className="row">
        <div className="col-sm-4">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-brands fa-searchengin"></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={searchKeyword}
              placeholder="Nhập tên nhân viên để tìm kiếm theo tên"
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <input
            type="date"
            className="form-control"
            disabled
            name="startTime"
            style={{ cursor: "not-allowed" }}
          />
        </div>
        <div className="col-sm-2">
          <input
            type="date"
            className="form-control"
            disabled
            name="endTime"
            style={{ cursor: "not-allowed" }}
          />
        </div>
        {/* Export: */}
        <div className="col-sm-2">
          <CSVLink
            uFEFF={false}
            data={exportData}
            className="btn btn-primary w-100"
            filename={`${Date.now()}.csv`}
          >
            <i className="fa-solid fa-download mx-1"></i>
            Tất Cả
          </CSVLink>
        </div>
        <div className="col-sm-2">
          <CSVLink
            data={exportData}
            className="btn btn-primary w-100 disabled"
            filename={`${Date.now()}.csv`}
          >
            <i className="fa-solid fa-download mx-1"></i>
            Đã Lọc
          </CSVLink>
        </div>
      </div>

      {/* Table */}
      <table className="table table-sm table-bordered table-striped table-hover">
        <thead className="table-primary">
          <tr className="text-center text-uppercase">
            <th>Họ Tên</th>
            <th>Địa Chỉ Email</th>
            <th>Số Điện Thoại</th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Giới Tính
              <select
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1 form-select form-select-sm`}
                onChange={(e) => {
                  setSelectedGender(e.target.value === "true");
                  setSortDisable(true);
                }}
              >
                <option value={false}>Nam</option>
                <option value={true}>Nữ</option>
              </select>
            </th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Trạng Thái
              <select
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1 form-select form-select-sm`}
                onChange={(e) => {
                  setSelectedStatus(e.target.value === "true");
                  setSortDisable(true);
                }}
              >
                <option value={false}>Còn làm việc</option>
                <option value={true}>Đã nghỉ việc</option>
              </select>
            </th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Chức Vụ
              <select
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1 form-select form-select-sm`}
                onChange={(e) => {
                  setSelectedPosition(parseInt(e.target.value));
                  setSortDisable(true);
                }}
              >
                <option value={1}>Quản lý</option>
                <option value={2}>Nhân viên</option>
                <option value={3}>Bếp</option>
              </select>
            </th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-center m-auto">
          {employees
            ?.slice(offset, offset + process.env.REACT_APP_PAGINATE_SIZE)
            ?.filter((v) =>
              v.fullName.toLowerCase().includes(searchKeyword.toLowerCase())
            )
            ?.filter((v) => !selectedGender ?? v.gender === selectedGender)
            ?.filter((v, i) => {
              const isWorking = !v.DeletedAt;
              const isNotWorking = v.DeletedAt;
              return selectedStatus === undefined
                ? true
                : selectedStatus === false
                ? isWorking
                : selectedStatus === true
                ? isNotWorking
                : false;
            })
            ?.filter((v) =>
              !selectedPosition ? true : v.account.roleId === selectedPosition
            )
            ?.map((v, i) => {
              return (
                <tr key={v.ID}>
                  <td>{v.fullName}</td>
                  <td>{v.account.email}</td>
                  <td>{v.tel}</td>
                  <td>{v.gender ? "Nữ" : "Nam"}</td>
                  <td>
                    <button className="btn btn-primary m-auto disabled">
                      {v.account.DeletedAt ? "Đã Nghỉ Việc" : "Còn Làm Việc"}
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-primary m-auto disabled">
                      {v.account.roleId === 1
                        ? "Quản Lý"
                        : v.account.roleId === 2
                        ? "Phục Vụ"
                        : "Bếp"}
                    </button>
                  </td>
                  <td className="d-flex justify-content-align-content-around">
                    <button
                      className={`flex-fill btn btn-outline-warning mx-1 ${
                        v.DeletedAt ? "disabled" : ""
                      }`}
                      onClick={() => handleResetPassword(v.account.email)}
                    >
                      Khôi Phục
                    </button>
                    <button
                      className={`flex-fill btn btn-outline-danger mx-1 ${
                        v.DeletedAt ? "disabled" : ""
                      }`}
                      onClick={() => handleDelete(v.ID, v.account.email)}
                    >
                      Thu Hồi
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Paginate */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          itemsPerPage={process.env.REACT_APP_PAGINATE_SIZE}
          nextLabel={<i className="fa-solid fa-arrow-right"></i>}
          previousLabel={<i className="fa-solid fa-arrow-left"></i>}
          onPageChange={(e) => {
            const currentPage = e.selected + 1;
            const offset =
              (currentPage - 1) * process.env.REACT_APP_PAGINATE_SIZE;
            setOffset(offset);
          }}
          marginPagesDisplayed={3}
          pageCount={employees.length / process.env.REACT_APP_PAGINATE_SIZE}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
