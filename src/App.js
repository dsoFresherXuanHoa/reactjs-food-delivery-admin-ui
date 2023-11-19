import SignIn from "components/auth/SignIn";
import CategoryDashboard from "components/dashboard/Category/CategoryDashboard";
import EmployeeDashboard from "components/dashboard/Employee/EmployeeDashboard";
import GoodDashboard from "components/dashboard/Good/GoodDashboard";
import RevenueDashboard from "components/dashboard/Revenue/RevenueDashboard";
import PageNotFound from "pages/error/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
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
  );
}

export default App;
