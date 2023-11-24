import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const CreateCategory = () => {
  // Handle Submit Form
  const payload = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(payload);
  const { setIsLoading } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.length === 0 || formData.description.length === 0) {
      toast.error("Vui lòng điền đầy đủ các thông tin!");
    } else {
      const accessToken = localStorage.getItem("accessToken");
      axios
        .post(`${process.env.REACT_APP_BASE_API_URL}/categories/`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(true);
          setFormData({
            name: "",
            description: "",
          });
          toast.success("Thêm nhóm sản phẩm thành công!");
        })
        .catch((err) => {
          toast.success("Thêm nhóm sản phẩm thất bại!");
        });
    }
  };

  // Handle Reset
  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
    });
  };
  return (
    <div className="p-3 border rounded-3 shadow m-1">
      <form>
        <span>
          <i className="m-2 fa-solid fa-user fa-2x text-success"></i>
          <span className="mx-3 text-uppercase text-success fw-bold">
            Nhập Nhóm Sản Phẩm Mới Cho Nhà Hàng:
          </span>
          <p className="mx-3 text-info">
            <i className="mx-3 fa-solid fa-info"></i>
            Vui lòng nhập đúng và đủ các thông tin về nhóm sản phẩm:
          </p>
        </span>

        <div className="form-floating my-3">
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Nhập tên sản phẩm:"
            name="name"
            required
          />
          <label htmlFor="tfCategoryName">Tên Nhóm Sản Phẩm: </label>
        </div>

        <div className="form-floating">
          <textarea
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            name="description"
            placeholder="Nhập mô tả sản phẩm tại đây: "
          ></textarea>
          <label htmlFor="tfDescription">Mô Tả Nhóm Sản Phẩm: </label>
        </div>

        <div className="d-grid d-flex">
          <button
            type="submit"
            className="m-2 flex-fill btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Đăng Ký
          </button>
          <button
            type="reset"
            className="m-2 flex-fill btn btn-primary btn btn-warning text-white"
            onClick={handleReset}
          >
            Làm Lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
