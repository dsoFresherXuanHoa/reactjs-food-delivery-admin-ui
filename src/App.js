import SignIn from "components/auth/SignIn";
import CategoryDashboard from "components/dashboard/Category/CategoryDashboard";
import EmployeeDashboard from "components/dashboard/Employee/EmployeeDashboard";
import GoodDashboard from "components/dashboard/Good/GoodDashboard";
import RevenueDashboard from "components/dashboard/Revenue/RevenueDashboard";
import Forbidden from "pages/error/Forbidden";
import PageNotFound from "pages/error/PageNotFound";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const [isAllow, setIsAllow] = useState(true);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsAllow(true);
    }
  }, []);
  return (
    <>
      {isAllow ? (
        <div className="container-fluid">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route>
                <Route index path="employees" element={<EmployeeDashboard />} />
                <Route path="goods" element={<GoodDashboard />} />
                <Route path="revenues" element={<RevenueDashboard />} />
                <Route path="categories" element={<CategoryDashboard />} />
              </Route>
              <Route path="/forbidden" element={<Forbidden />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover={false}
            theme="light"
          />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center"
          style={{ position: "absolute", top: "50%" }}
        >
          <p
            className="d-flex text-danger h5 text-center mx-auto"
            style={{ minWidth: "100vw" }}
          >
            Không hỗ trợ trên các thiết bị có kích thước màn hình nhỏ hơn 768px!
          </p>
          <br />
          <i className="fa-solid fa-face-sad-tear fa-3x text-danger"></i>
        </div>
      )}
    </>
  );
}

export default App;
