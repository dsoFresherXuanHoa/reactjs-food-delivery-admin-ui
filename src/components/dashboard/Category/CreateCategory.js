const CreateCategory = () => {
  return (
    <div className="p-3 border rounded-3 shadow m-1">
      <form action="" method="post">
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
            type="text"
            className="form-control"
            id="tfCategoryName"
            placeholder="Nhập tên sản phẩm:"
            name="categoryName"
            required
          />
          <label htmlFor="tfCategoryName">Tên Nhóm Sản Phẩm: </label>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control"
            id="tfDescription"
            name="description"
            placeholder="Nhập mô tả sản phẩm tại đây: "
          ></textarea>
          <label htmlFor="tfDescription">Mô Tả Nhóm Sản Phẩm: </label>
        </div>

        <div className="d-grid d-flex">
          <button
            type="submit"
            className="m-2 flex-fill btn btn-primary btn-block"
          >
            Đăng Ký
          </button>
          <button
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

export default CreateCategory;
