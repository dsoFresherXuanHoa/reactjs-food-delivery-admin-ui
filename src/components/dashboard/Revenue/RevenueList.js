const RevenueList = () => {
  return (
    <div className="container-fluid p-3 border rounded-3 shadow m-1">
      <table className="table table-sm table-bordered table-striped table-hover">
        <thead className="table-primary">
          <tr className="text-center text-uppercase">
            <th>Mã Đơn Hàng</th>
            <th>Thời Gian Lập Đơn</th>
            <th>Thòi Gian Chấp Nhận Đơn</th>
            <th>Bàn</th>
            <th>Khu Vực</th>
            <th>Sản Phẩm</th>
            <th>Ghi Chú</th>
            <th>Phân Loại Đơn</th>
            <th>Lý Do</th>
          </tr>
        </thead>
        <tbody className="text-center m-auto">
          <tr>
            <td>Cơm Chiên Dương Châu</td>
            <td>Cơm Chiên Dương Châu, thơm ngon bổ dưỡng</td>
            <td>30000</td>
            <td>125</td>
            <td>Món Ăn Chính</td>
            <td>5</td>
            <td>10</td>
            <td>
              <button className="flex-fill btn btn-success mx-1">
                Đơn Hoàn Thành
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RevenueList;
