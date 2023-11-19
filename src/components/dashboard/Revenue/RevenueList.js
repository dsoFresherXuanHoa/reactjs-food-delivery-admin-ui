import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";

const RevenueList = () => {
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

  // Paging
  const [offset, setOffset] = useState(0);

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

  // Time Filter
  const [startTime, setStartTime] = useState(Date.now);
  const [endTime, setEndTime] = useState(Date.now);

  return (
    <div className="container-fluid p-3 border rounded-3 shadow m-1">
      {/* Search */}
      <div className="row">
        <div className="col-sm-6">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-brands fa-searchengin"></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={searchKeyword}
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
            Tải Xuống
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
            <th>Bàn</th>
            <th>Khu Vực</th>
            <th>Sản Phẩm</th>
            <th>Phân Loại Đơn</th>
            <th>Ghi Chú</th>
            <th>Lý Do Hủy</th>
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
            .slice(offset, offset + process.env.REACT_APP_PAGINATE_SIZE)
            .map((v, i) => (
              <tr key={i}>
                <td>{new Date(Date.parse(v.createdTime)).toLocaleString()}</td>
                <td>
                  {v.acceptedTime
                    ? new Date(Date.parse(v.acceptedTime)).toLocaleString()
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
                        className="list-group-item list-group-item-action list-group-item-primary d-flex justify-content-between align-items-center"
                      >
                        {v.product.name}
                        <span className="badge bg-primary rounded-pill">
                          {v.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="d-flex">
                  {v.compensate ? (
                    <button className="flex-fill btn btn-warning mx-1">
                      Đền
                    </button>
                  ) : !v.acceptedTime ? (
                    <button className="flex-fill btn btn-warning mx-1">
                      Chờ Chấp Nhận
                    </button>
                  ) : v.status ? (
                    <button className="flex-fill btn btn-success mx-1">
                      Hoàn Thành
                    </button>
                  ) : (
                    <button className="flex-fill btn btn-success mx-1">
                      Chưa Hoàn Thành
                    </button>
                  )}
                </td>
                <td>{v.note}</td>
                <td>{v.reason}</td>
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
