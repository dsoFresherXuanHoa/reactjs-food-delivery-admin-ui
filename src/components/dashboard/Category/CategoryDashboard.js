import Footer from "components/partial/Footer";
import Header from "components/partial/Header";
import CategoriesList from "./CategoryList";
import CreateCategory from "./CreateCategory";

const CategoryDashboard = () => {
  return (
    <div className="container-fluid">
      <Header />

      <div
        className="border shadow"
        style={{ marginTop: 70, minHeight: "80vh" }}
      >
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

      <Footer />
    </div>
  );
};

export default CategoryDashboard;
