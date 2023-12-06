import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { CurrencyFormat } from "utils/NumberUtil";
import RevenueInfo from "./RevenueInfo";

const RevenueList = () => {
  // Check User Permission
  const navigate = useNavigate();

  // Export
  const [exportData, setExportData] = useState([]);

  // Get Revenue
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/booking/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setOrders(res.data.data);

        const exportData = res.data.data.map((v) => ({
          createdTime: v.createdTime,
          acceptedTime: v.acceptedTime,
          compensate: v.compensate,
          items: v.items.reduce(
            (a, item) => (a += `${item.product.name}-${item.quantity}:`),
            ""
          ),
          note: v.note,
          reason: v.reason,
          status: v.status,
          table: v.table.ID,
          area: v.table.area.pos,
        }));
        setExportData(exportData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get All Table
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/tables/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setTables(res.data.data);
      })
      .catch((err) => {
        const statusCode = err.response.data.statusCode;
        if (statusCode === 403) {
          navigate("/forbidden");
        }
      });
  }, []);

  // Paging
  const [offset, setOffset] = useState(0);

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

  // Time Filter
  const [startTime, setStartTime] = useState(Date.now);
  const [endTime, setEndTime] = useState(Date.now);

  // Sort
  const [sortDisable, setSortDisable] = useState(true);

  // Filter
  const orderType = ["Từ Chối", "Chờ", "Hoàn Thành", "Chưa Hoàn Thành"];
  const [selectedTable, setSelectedTable] = useState();
  const [selectedOrderType, setSelectedTableType] = useState();

  // Show Bill Information:
  const [selectedId, setSelectedId] = useState(0);

  return (
    <div className="container-fluid p-3 border rounded-3 shadow m-1">
      {/* RevenueInfo Modals */}
      <RevenueInfo id={selectedId} />

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
              placeholder="Nhập tên khu vực để tìm theo tên khu vực"
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
            name="startTime"
            onChange={(e) => {
              setStartTime(Date.parse(e.target.value));
            }}
          />
        </div>
        <div className="col-sm-2">
          <input
            type="date"
            className="form-control"
            name="endTime"
            onChange={(e) => {
              setEndTime(Date.parse(e.target.value));
            }}
          />
        </div>

        {/* Export: */}
        <div className="col-sm-2">
          <CSVLink
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
            <th>Lập Đơn</th>
            <th>Chấp Nhận</th>
            <th>Nhân Viên</th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Bàn
              <select
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1 form-select form-select-sm`}
                onChange={(e) => {
                  setSelectedTable(parseInt(e.target.value));
                  setSortDisable(true);
                }}
              >
                {tables.map((v) => (
                  <option key={v.ID} value={v.ID}>
                    {v.ID}
                  </option>
                ))}
              </select>
            </th>
            <th>Khu Vực</th>
            <th>Sản Phẩm</th>
            <th>Tổng</th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Loại Đơn
              <select
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1 form-select form-select-sm`}
                onChange={(e) => {
                  setSelectedTableType(parseInt(e.target.value));
                  setSortDisable(true);
                }}
              >
                {orderType.map((v, i) => (
                  <option key={i} value={i}>
                    {v}
                  </option>
                ))}
              </select>
            </th>
            <th>Ghi Chú</th>
            <th>Lý Do Hủy</th>
            <th>Chi Tiết</th>
          </tr>
        </thead>
        <tbody className="text-center m-auto">
          {orders
            .filter((v) =>
              v.table.area.pos
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
            )
            .filter((v) =>
              startTime !== endTime
                ? Date.parse(v.createdTime) > startTime &&
                  Date.parse(v.createdTime) < endTime
                : true
            )
            .filter((v) =>
              !selectedTable ? true : selectedTable === v.table.ID
            )
            .filter((v, i) => {
              const isNotFinished = v.acceptedTime && !v.status;
              const isNotAccepted = !v.acceptedTime && !v.rejected;
              const isFinish = v.acceptedTime && v.status;
              const isRejected = v.rejected;

              return selectedOrderType === undefined
                ? true
                : selectedOrderType === 0
                ? isRejected
                : selectedOrderType === 3
                ? isNotFinished
                : selectedOrderType === 1
                ? isNotAccepted
                : selectedOrderType === 2
                ? isFinish
                : false;
            })
            .slice(
              offset,
              offset + parseInt(process.env.REACT_APP_PAGINATE_SIZE)
            )
            .map((v, i) => (
              <tr key={i}>
                <td>{new Date(Date.parse(v.createdTime)).toDateString()}</td>
                <td>
                  {v.acceptedTime
                    ? new Date(Date.parse(v.acceptedTime)).toDateString()
                    : ""}
                </td>
                <td>{v.table.employee.fullName}</td>
                <td>{v.table.ID}</td>
                <td>{v.table.area.pos}</td>
                <td>
                  <ul className="list-group">
                    {v.items.map((v, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action list-group-item-primary d-flex justify-content-end"
                      >
                        {v.product.name}
                        <span className="badge bg-primary rounded-pill ms-2">
                          {v.quantity}
                        </span>
                        <span className="badge bg-danger rounded-pill ms-2">
                          {CurrencyFormat(v.product.actualDiscountPrice)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{CurrencyFormat(v.totalPrice)}</td>
                <td className="d-flex">
                  {v.rejected ? (
                    <button className="flex-fill btn btn-danger mx-1">
                      Từ Chối
                    </button>
                  ) : !v.acceptedTime ? (
                    <button className="flex-fill btn btn-warning mx-1">
                      Chờ
                    </button>
                  ) : v.status ? (
                    <button className="flex-fill btn btn-success mx-1">
                      Hoàn Thành
                    </button>
                  ) : (
                    <button className="flex-fill btn btn-primary mx-1">
                      Chưa Hoàn Thành
                    </button>
                  )}
                </td>
                <td>{v.note}</td>
                <td>{v.reason}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedId(v.orderId);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#revenueInfo"
                    className="btn btn-secondary"
                  >
                    <i className="fa-solid fa-info"></i>
                  </button>
                </td>
              </tr>
            ))}
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
          pageCount={orders.length / process.env.REACT_APP_PAGINATE_SIZE}
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

export default RevenueList;
