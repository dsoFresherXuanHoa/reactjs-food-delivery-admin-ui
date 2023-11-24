import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateGood = ({ id }) => {
  // Get product information:
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [minQuantity, setMinQuantity] = useState(0);
  const [stockAmount, setStockAmount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [discountId, setDiscountId] = useState(0);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (id !== 0) {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(true);
          setName(res.data.data.name);
          setDescription(res.data.data.description);
          setPrice(res.data.data.price);
          setDiscountPercent(res.data.data.discount.discountPercent);
          setMinQuantity(res.data.data.discount.minQuantity);
          setStockAmount(res.data.data.stockAmount);

          setProductId(res.data.data.ID);
          setDiscountId(res.data.data.discount.ID);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    axios
      .patch(
        `${process.env.REACT_APP_BASE_API_URL}/warehouses/?productId=${productId}&discountId=${discountId}`,
        {
          name,
          description,
          price,
          stockAmount,
          minQuantity,
          discountPercent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(true);
        toast.success("Cập nhật sản phẩm thành công!");
      })
      .catch((err) => {
        toast.error("Cập nhật sản phẩm thất bại!");
      });
  };

  const handleReset = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setDiscountPercent(0);
    setMinQuantity(0);
    setStockAmount(0);
  };
  return (
    <div className="modal" id="updateGoods">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-success fw-bold text-uppercase">
              Cập Nhật Thông Tin Sản Phẩm
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-floating my-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="tfProductName"
                  placeholder="Nhập tên sản phẩm:"
                  name="name"
                  required
                />
                <label htmlFor="tfProductName">Tên Sản Phẩm: </label>
              </div>

              <div className="form-floating">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
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
                    value={discountPercent}
                    onChange={(e) =>
                      setDiscountPercent(parseInt(e.target.value))
                    }
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
              </div>

              <div className="row">
                <div className="col form-floating my-3">
                  <input
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(parseInt(e.target.value))}
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

                <div className="col form-floating my-3">
                  <input
                    value={stockAmount}
                    onChange={(e) => setStockAmount(parseInt(e.target.value))}
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
            </form>
          </div>

          <div className="modal-footer">
            <div className="d-grid d-flex">
              <button
                onClick={handleSubmit}
                type="button"
                className="m-2 flex-fill btn btn-primary btn-block"
                data-bs-dismiss="modal"
              >
                Cập Nhật
              </button>
              <button
                onClick={handleReset}
                type="reset"
                className="m-2 flex-fill btn btn-primary btn btn-warning text-white"
              >
                Làm Lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGood;
