import CategoriesList from "./CategoryList";
import CreateCategory from "./CreateCategory";

const CategoryDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="border shadow position-relative" style={{ top: 70 }}>
        <ul className="nav nav-tabs nav-justified" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#query">
              <i className="fa-solid fa-info mx-1 text-success"></i>
              <span className="text-success text-text-uppercase mx-2 fw-bold">
                Thao Tác
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#create">
              <i className="fa-solid fa-plus"></i>
              <span className="text-success text-text-uppercase mx-2 fw-bold">
                Tạo Mới
              </span>
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="query" className="container-fluid tab-pane active">
            <CategoriesList />
          </div>
          <div id="create" className="container-fluid tab-pane fade">
            <CreateCategory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDashboard;
