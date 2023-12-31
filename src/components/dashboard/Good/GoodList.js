import axios from "axios";
import UpdateGood from "./UpdateGood";

import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CurrencyFormat } from "utils/NumberUtil";

const GoodsList = () => {
  // Check User Permission
  const navigate = useNavigate();

  // Export
  const [exportData, setExportData] = useState([]);

  // Get Product List
  const [selectedId, setSelectedId] = useState(0);
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const [goods, setGoods] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/products/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setGoods(res.data.data);
        const exportData = goods.map((v) => ({
          createdAt: v.CreatedAt,
          deletedAt: v.DeletedAt,
          name: v.name,
          description: v.description,
          price: v.price,
          img: v.thumb,
          reorderLevel: v.reorderLevel,
          stockAmount: v.stockAmount,
          category: v.category.name,
          discount: v.discount.discountPercent,
          minQuantity: v.discount.minQuantity,
          unit: v.uint,
        }));
        setExportData(exportData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);

  // Get Categories List
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/categories/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setCategories(res.data.data);
        const exportData = categories.map((v) => ({
          name: v.name,
          description: v.description,
        }));
        setExportData(exportData);
      })
      .catch((err) => {
        const statusCode = err.response.data.statusCode;
        if (statusCode === 403) {
          navigate("/forbidden");
        }
      });
  }, []);

  // Delete Product:
  const handleDelete = (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const confirm = window.confirm("Xác nhận xóa sản phẩm");
    if (confirm) {
      axios
        .delete(`${process.env.REACT_APP_BASE_API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(true);
          toast.success(
            "Gỡ sản phẩm thành công, từ giờ chỉ tài khoản quản trị viên mới truy cập vào tài nguyên đã xóa"
          );
        })
        .catch((err) => {
          toast.error("Xóa sản phẩm thất bại! Vui lòng thử lại sau!");
        });
    }
  };

  // Paging
  const [offset, setOffset] = useState(0);

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

  // Sort
  const [sortDisable, setSortDisable] = useState(true);

  // Time Filter
  const [startTime, setStartTime] = useState(Date.now);
  const [endTime, setEndTime] = useState(Date.now);

  return (
    <div className="container-fluid table-responsive p-3 border rounded-3 shadow m-1">
      {/* Update Modals */}
      <UpdateGood id={selectedId} />

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
              placeholder="Nhập tên món ăn để tìm kiếm theo tên món ăn"
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
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Mô Tả</th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Đơn Giá
              <span
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1`}
              >
                <i
                  className="fa-solid fa-arrow-down-z-a me-2 text-danger"
                  onClick={(e) => {
                    setGoods(goods.sort((c, n) => n.price - c.price));
                    setSortDisable(true);
                  }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-a-z text-success"
                  onClick={(e) => {
                    setGoods(goods.sort((c, n) => c.price - n.price));
                    setSortDisable(true);
                  }}
                ></i>
              </span>
            </th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Tồn Kho
              <span
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1`}
              >
                <i
                  className="fa-solid fa-arrow-down-z-a me-2 text-danger"
                  onClick={(e) => {
                    setGoods(
                      goods.sort((c, n) => n.stockAmount - c.stockAmount)
                    );
                    setSortDisable(true);
                  }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-a-z text-success"
                  onClick={(e) => {
                    setGoods(
                      goods.sort((c, n) => c.stockAmount - n.stockAmount)
                    );
                    setSortDisable(true);
                  }}
                ></i>
              </span>
            </th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Phân Loại
              <select
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1 form-select form-select-sm`}
                onChange={(e) => {
                  setSelectedCategory(parseInt(e.target.value));
                  setSortDisable(true);
                }}
              >
                {categories.map((v) => (
                  <option key={v.ID} value={v.ID}>
                    {v.name}
                  </option>
                ))}
              </select>
            </th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Giảm Giá
              <span
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1`}
              >
                <i
                  className="fa-solid fa-arrow-down-z-a me-2 text-danger"
                  onClick={(e) => {
                    setGoods(
                      goods.sort(
                        (c, n) =>
                          n.discount.discountPercent -
                          c.discount.discountPercent
                      )
                    );
                    setSortDisable(true);
                  }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-a-z text-success"
                  onClick={(e) => {
                    setGoods(
                      goods.sort(
                        (c, n) =>
                          c.discount.discountPercent -
                          n.discount.discountPercent
                      )
                    );
                    setSortDisable(true);
                  }}
                ></i>
              </span>
            </th>
            <th
              onMouseDownCapture={(e) => {
                setSortDisable(false);
              }}
            >
              Tối Thiểu
              <span
                className={`${
                  sortDisable ? "visually-hidden" : ""
                } d-flex justify-content-center my-1`}
              >
                <i
                  className="fa-solid fa-arrow-down-z-a me-2 text-danger"
                  onClick={(e) => {
                    setGoods(
                      goods.sort(
                        (c, n) =>
                          n.discount.minQuantity - c.discount.minQuantity
                      )
                    );
                    setSortDisable(true);
                  }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-a-z text-success"
                  onClick={(e) => {
                    setGoods(
                      goods.sort(
                        (c, n) => c.discount.discount - n.discount.discount
                      )
                    );
                    setSortDisable(true);
                  }}
                ></i>
              </span>
            </th>
            <th>Đơn Vị</th>
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
                <option value={true}>Kinh Doanh</option>
                <option value={false}>Gỡ Bỏ</option>
              </select>
            </th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-center m-auto">
          {goods
            .filter((v) =>
              v.name.toLowerCase().includes(searchKeyword.toLowerCase())
            )
            .filter((v) =>
              startTime !== endTime
                ? Date.parse(v.CreatedAt) > startTime &&
                  Date.parse(v.CreatedAt) < endTime
                : true
            )
            .filter((v) =>
              !selectedCategory ? true : v.category.ID === selectedCategory
            )
            .filter((v) => {
              return selectedStatus === undefined
                ? true
                : !v.DeletedAt === selectedStatus;
            })
            .slice(
              offset,
              offset + parseInt(process.env.REACT_APP_PAGINATE_SIZE)
            )
            .map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v.name}</td>
                  <td>
                    <img height={100} src={v.thumb} alt={v.name} />
                  </td>
                  <td>{v.description}</td>
                  <td>{CurrencyFormat(v.price)}</td>
                  <td>{v.stockAmount}</td>
                  <td>{v.category.name}</td>
                  <td>{v.discount.discountPercent}</td>
                  <td>{v.discount.minQuantity}</td>
                  <td>{v.uint}</td>
                  <td style={{ height: 108 }}>
                    {v.DeletedAt ? (
                      <button className="btn btn-danger h-100">Đã Xóa</button>
                    ) : (
                      <button className="btn btn-success h-100">
                        Kinh Doanh
                      </button>
                    )}
                  </td>

                  <td className="d-flex" style={{ height: 108 }}>
                    <button
                      onClick={() => {
                        setSelectedId(v.ID);
                      }}
                      className={`flex-fill btn btn-outline-success mx-1 ${
                        v.DeletedAt ? "disabled" : ""
                      }`}
                      data-bs-toggle="modal"
                      data-bs-target="#updateGoods"
                    >
                      Cập Nhật
                    </button>
                    <button
                      className={`flex-fill btn btn-outline-danger mx-1 ${
                        v.DeletedAt ? "disabled" : ""
                      }`}
                      onClick={() => handleDelete(v.ID)}
                    >
                      Gỡ Xuống
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
          pageCount={goods.length / process.env.REACT_APP_PAGINATE_SIZE}
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

export default GoodsList;
