import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const CategoriesList = () => {
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
      })
      .catch((err) => {
        console.log(err);
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
        <div className="col-sm-3">
          <input
            type="date"
            className="form-control"
            name="startTime"
            disabled
            style={{ cursor: "not-allowed" }}
          />
        </div>
        <div className="col-sm-3">
          <input
            type="date"
            className="form-control"
            name="endTime"
            disabled
            style={{ cursor: "not-allowed" }}
          />
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
            .slice(offset, offset + process.env.REACT_APP_PAGINATE_SIZE)
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
