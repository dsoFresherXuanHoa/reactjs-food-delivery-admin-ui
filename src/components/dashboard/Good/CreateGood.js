import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateGoods = () => {
  // Get Category
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/categories/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle submit form
  const payload = {
    name: "",
    thumb: "",
    description: "",
    price: 0,
    categoryId: 1,
    discountPercent: 0,
    minQuantity: 0,
    stockAmount: 0,
  };

  const [formData, setFormData] = useState(payload);
  const [isAllowImport, setIsAllowImport] = useState(true);
  const { setIsLoading } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      if (["name", "description"].includes(name)) {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: parseInt(value) });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Đang thêm sản phẩm, vui lòng chờ...");
    setIsAllowImport(false);

    const accessToken = localStorage.getItem("accessToken");
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/warehouses/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(true);
        setIsAllowImport(true);
        setFormData({
          name: "",
          thumb: "",
          description: "",
          price: 0,
          categoryId: 1,
          discountPercent: 0,
          minQuantity: 0,
          stockAmount: 0,
        });
        toast.success("Thêm sản phẩm thành công!");
      })
      .catch((err) => {
        setIsAllowImport(true);
        toast.success("Thêm sản phẩm thất bại!");
      });
  };
  const handleReset = () => {
    setFormData({
      name: "",
      thumb: "",
      description: "",
      price: 0,
      categoryId: 1,
      discountPercent: 0,
      minQuantity: 0,
      stockAmount: 0,
    });
  };

  return (
    <div className="p-3 border rounded-3 shadow m-1">
      <form>
        <span>
          <i className="m-2 fa-solid fa-user fa-2x text-success"></i>
          <span className="mx-3 text-uppercase text-success fw-bold">
            Nhập Sản Phẩm Mới Cho Nhà Hàng:
          </span>
          <p className="mx-3 text-info">
            <i className="mx-3 fa-solid fa-info"></i>
            Vui lòng nhập đúng và đủ các thông tin về sản phẩm:
          </p>
        </span>

        <div className="form-floating my-3">
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="tfProductName"
            placeholder="Nhập tên sản phẩm:"
            name="name"
            required
          />
          <label htmlFor="tfProductName">Tên Sản Phẩm: </label>
        </div>

        <div className="mb-3">
          <input
            onChange={handleChange}
            className="form-control"
            type="file"
            id="tfProductThumb"
            name="thumb"
          />
        </div>

        <div className="form-floating">
          <textarea
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            id="tfDescription"
            name="description"
            placeholder="Nhập mô tả sản phẩm tại đây: "
          ></textarea>
          <label htmlFor="tfDescription">Mô Tả Sản Phẩm: </label>
        </div>

        <div className="row">
          <div className="col form-floating my-3">
            <input
              value={formData.price}
              onChange={handleChange}
              type="number"
              className="form-control"
              id="tfPrice"
              placeholder="Nhập đơn giá sản phẩm:"
              name="price"
              min={1000}
              step={5000}
              max={100000}
              required
            />
            <label htmlFor="tfPrice" className="mx-3">
              Đơn Giá:{" "}
            </label>
          </div>

          <div className="col form-floating my-3">
            <input
              value={formData.discountPercent}
              onChange={handleChange}
              type="number"
              className="form-control"
              id="tfDiscountPercent"
              placeholder="Nhập phần trăm giảm giá sản phẩm:"
              name="discountPercent"
              required
            />
            <label htmlFor="tfDiscountPercent" className="mx-3">
              Phần Trăm Giảm Giá:{" "}
            </label>
          </div>

          <div className="col form-floating my-3">
            <input
              value={formData.minQuantity}
              onChange={handleChange}
              type="number"
              className="form-control"
              id="tfMinQuantity"
              placeholder="Nhập số lượng sản phẩm tối thiểu để sử dụng mã giảm giá:"
              name="minQuantity"
              required
            />
            <label htmlFor="tfMinQuantity" className="mx-3">
              Sản Phẩm Tối Thiểu:{" "}
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col form-floating my-3">
            <select
              onChange={handleChange}
              value={formData.categoryId}
              className="form-select"
              id="slcCategory"
              name="categoryId"
            >
              {categories.map((v, i) => (
                <option key={i} value={i + 1}>
                  {v.name}
                </option>
              ))}
            </select>
            <label htmlFor="slcCategory" className="form-label mx-3">
              Chọn Phân Loại Sản Phẩm
            </label>
          </div>

          <div className="col form-floating my-3">
            <input
              value={formData.stockAmount}
              onChange={handleChange}
              type="number"
              className="form-control"
              id="tfStockQuantity"
              placeholder="Nhập giá trị quy đổi qua tồn kho:"
              name="stockAmount"
              required
            />
            <label htmlFor="tfStockQuantity" className="mx-3">
              Quy Đổi Tồn Kho:{" "}
            </label>
          </div>
        </div>

        <div className="d-grid d-flex">
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={!isAllowImport}
            className="m-2 flex-fill btn btn-primary btn-block"
          >
            Đăng Ký
          </button>
          <button
            onClick={handleReset}
            type="reset"
            className="m-2 flex-fill btn btn-primary btn btn-warning text-white"
          >
            Làm Lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoods;
