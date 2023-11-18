const CategoriesList = () => {
  return (
    <div className="container-fluid table-responsive p-3 border rounded-3 shadow m-1">
      <table className="table table-sm table-bordered table-striped table-hover">
        <thead className="table-primary">
          <tr className="text-center text-uppercase">
            <th>Tên Nhóm Sản Phẩm</th>
            <th>Mô Tả Nhóm Sản Phẩm</th>
          </tr>
        </thead>
        <tbody className="text-center m-auto">
          <tr>
            <td>Món Ăn Nhanh</td>
            <td>Món Ăn Nhanh, Thơm Ngon Bổ Dưỡng</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
