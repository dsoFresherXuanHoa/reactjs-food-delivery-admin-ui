import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
  // Check User Permission
  const navigate = useNavigate();

  // Export
  const [exportData, setExportData] = useState([]);

  // Get Categories List
  const [categories, setCategories] = useState([]);
  const { isLoading, setIsLoading } = useContext(AuthContext);
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
  }, [isLoading]);

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

  // Paging
  const [offset, setOffset] = useState(0);

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
              placeholder="Nhập tên nhóm món ăn để tìm kiếm theo tên nhóm"
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
            disabled
            style={{ cursor: "not-allowed" }}
          />
        </div>
        <div className="col-sm-2">
          <input
            type="date"
            className="form-control"
            name="endTime"
            disabled
            style={{ cursor: "not-allowed" }}
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
            <th>Tên Nhóm Sản Phẩm</th>
            <th>Mô Tả Nhóm Sản Phẩm</th>
          </tr>
        </thead>
        <tbody className="text-center m-auto">
          {categories
            .slice(
              offset,
              offset + parseInt(process.env.REACT_APP_PAGINATE_SIZE)
            )
            .filter((v) =>
              v.name.toLowerCase().includes(searchKeyword.toLowerCase())
            )
            .map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.description}</td>
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
          pageCount={categories.length / process.env.REACT_APP_PAGINATE_SIZE}
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

export default CategoriesList;
