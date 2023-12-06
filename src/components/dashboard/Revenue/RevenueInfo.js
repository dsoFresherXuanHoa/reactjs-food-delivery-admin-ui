import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyFormat } from "utils/NumberUtil";

const RevenueInfo = ({ id }) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (id !== 0) {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/booking/?orderId=${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setOrder(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div className="modal" id="revenueInfo">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-success fw-bold text-uppercase">
              Thông Tin Chi Tiết Hóa Đơn: {order.orderId}
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            {/* Thông Tin Hóa Đơn */}
            <p className="my-1">
              <b className="text-uppercase text-primary">Thời Gian Lập Đơn: </b>
              {order.acceptedTime
                ? Date(Date.parse(order.createdTime))
                : "Đơn Chưa Được Chấp Nhận"}
            </p>
            <p className="my-1">
              <b className="text-uppercase text-primary">
                Thời Gian Chấp Nhận:{" "}
              </b>
              {order.acceptedTime
                ? Date(Date.parse(order.acceptedTime))
                : "Đơn Chưa Được Chấp Nhận"}
            </p>
            <p className="my-1">
              <b className="text-uppercase text-primary">
                Trạng Thái Phục Vụ:{" "}
              </b>
              {order.status ? "Đơn Đã Hoàn Thành" : "Đơn Chưa Hoàn Thành"}
            </p>
            <div className="row">
              <p className="my-1 col-6">
                <b className="text-uppercase text-primary">Đơn Bồi Thường: </b>
                {order.compensate ? "Có" : "Không"}
              </p>
              <p className="my-1 col-6">
                <b className="text-uppercase text-primary">Đơn Từ Chối: </b>
                {order.rejected ? "Có" : "Không"}
              </p>
            </div>
            {order.rejected ?? (
              <p className="my-1 text-danger">
                <b className="text-uppercase text-danger">Lý Do Từ Chối: </b>
                {order.reason}
              </p>
            )}
            <p className="my-1 text-danger text-center fw-bold">
              <b className="text-uppercase">Ghi Chú: </b>
              {order.note}
            </p>
            <hr />

            {/* Thông Tin Nhân Viên */}
            <p className="my-1">
              <b className="text-uppercase text-primary">Nhân Viên: </b>
              {order?.table?.employee?.fullName}
            </p>
            <hr />

            {/* Thông Tin Bàn */}
            <div className="row">
              <p className="my-1 col-6">
                <b className="text-uppercase text-primary">Bàn: </b>
                {order?.table?.ID}
              </p>
              <p className="my-1 col-6">
                <b className="text-uppercase text-primary">Khu Vực: </b>
                {order?.table?.area?.pos}
              </p>
            </div>
            <div className="row">
              <p className="my-1 col-6">
                <b className="text-uppercase text-primary">Số Người Tối Đa: </b>
                {order?.table?.capacity}
              </p>
              <p className="my-1 col-6">
                <b className="text-uppercase text-primary">Loại Bàn: </b>
                {order?.table?.normalTable ? "Bàn Thường" : "Bàn VIP"}
              </p>
            </div>
            <hr />

            {/* Thông Tin Giá Hóa Đơn */}
            <p className="my-1">
              <b className="text-uppercase text-primary">Giá Bàn: </b>
              {order?.includeTableCost
                ? order?.table?.normalTable
                  ? "Miễn Phí"
                  : CurrencyFormat(order?.table?.basePrice)
                : "Miễn Phí"}
            </p>
            <p className="my-1">
              <b className="text-uppercase text-primary">Giá Sản Phẩm: </b>
            </p>
            <div>
              <table className="table table-hover table-bordered table-striped">
                <thead className="table-warning text-center">
                  <tr className="row">
                    <th className="col-4 ps-3 text-uppercase">Tên Sản Phẩm</th>
                    <th className="col-2 text-secondary ps-1 text-uppercase">
                      SL
                    </th>
                    <th className="col-2 text-secondary ps-1 text-uppercase">
                      Giá Gốc
                    </th>
                    <th className="col-2 text-secondary ps-1 text-uppercase">
                      Thực Bán
                    </th>
                    <th className="col-2 text-secondary ps-1 text-uppercase">
                      Thành Tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(order)}
                  {order.items?.map((v, i) => {
                    return (
                      <tr key={i} className="row">
                        <td className="col-4 ps-3 fw-bold">{v.product.name}</td>
                        <td className="col-2 ps-1 text-center">{v.quantity}</td>
                        <td className="col-2 ps-1 text-center">
                          <span className="badge bg-warning">
                            {CurrencyFormat(v.product.price)}
                          </span>
                        </td>
                        <td className="col-2 ps-1 text-center">
                          <span className="badge bg-danger">
                            {CurrencyFormat(v.product.actualDiscountPrice)}
                          </span>
                        </td>
                        <td className="col-2 ps-1 text-center">
                          <span className="badge bg-success">
                            {CurrencyFormat(
                              v.product.actualDiscountPrice * v.quantity
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="fst-italic small">
                Tổng giá hóa đơn đã bao gồm giá bàn (nếu có) và thuế giá trị gia
                tăng (VAT) (10% giá trị đơn hàng)
              </p>
              <p className="text-end fw-bold text-danger">
                <b className="text-uppercase">Thành Tiền: </b>
                {CurrencyFormat(order.totalPrice)}
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <div className="d-grid d-flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueInfo;
