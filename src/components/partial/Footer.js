const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase text-success fw-bold">
                Food Delivery API
              </h5>
              <p className="">
                Food Delivery API là ứng dụng cung cấp các chức năng quản lý
                thống kê, phục vụ và ra món ăn cho các nhà hàng vừa và lớn.
              </p>
            </div>

            <div className="col-md-4 mb-md-0 mb-4">
              <h5 className="text-uppercase text-success fw-bold">Tính Năng</h5>
              <ul className="list-unstyled">
                <li className="text-start">
                  <i className="fa-solid fa-check"></i>
                  <span className="mx-1">Đặt Món</span>
                </li>
                <li className="text-start">
                  <i className="fa-solid fa-check"></i>
                  <span className="mx-1">Quản Lý Món</span>
                </li>
                <li className="text-start">
                  <i className="fa-solid fa-check"></i>
                  <span className="mx-1">Quản Lý Doanh Thu</span>
                </li>
                <li className="text-start">
                  <i className="fa-solid fa-check"></i>
                  <span className="mx-1">Quản Lý Nhân Viên</span>
                </li>
              </ul>
            </div>

            <div className="col-md-2 mb-md-0 mb-2">
              <h5 className="text-uppercase text-success fw-bold">Liên Hệ</h5>
              <ul className="list-unstyled">
                <li className="text-start">
                  <i className="fa-brands fa-facebook"></i>
                  <span className="mx-2 text-muted">@fda.offical</span>
                </li>
                <li className="text-start">
                  <i className="fa-solid fa-reply"></i>
                  <span className="mx-2 text-muted">fda.contact</span>
                </li>
                <li className="text-start">
                  <i className="fa-solid fa-phone"></i>
                  <span className="mx-2 text-muted">0364015071</span>
                </li>
                <li className="text-start">
                  <i className="fa-solid fa-phone"></i>
                  <span className="mx-2 text-muted">0356415806</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
