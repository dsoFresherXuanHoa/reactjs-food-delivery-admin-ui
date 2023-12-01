import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatRevenue = () => {
  // Get Product List
  const [orders, setOrders] = useState([]);
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/booking/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Random Quote:
  useEffect(() => {
    axios
      .get(`https://api.quotable.io/random/`)
      .then((res) => {
        setQuote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Time Filter
  const [startTime, setStartTime] = useState(Date.now);
  const [endTime, setEndTime] = useState(Date.now);

  // Chart
  const orderType = ["Tất Cả", "Đơn Hoàn Thành", "Đơn Từ Chối"];

  return (
    <div
      className="container-fluid row border rounded m-2"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-2">
        <PieChart width={300} height={550}>
          <Pie
            dataKey="total"
            isAnimationActive={false}
            data={orderType.map((type, i) => {
              const totalOrder = orders
                .filter((v) =>
                  startTime !== endTime
                    ? Date.parse(v.createdTime) > startTime &&
                      Date.parse(v.createdTime) < endTime
                    : true
                )
                .reduce((a, v) => a + 1, 0);
              const totalRejectedOrder = orders
                .filter((v) =>
                  startTime !== endTime
                    ? Date.parse(v.createdTime) > startTime &&
                      Date.parse(v.createdTime) < endTime
                    : true
                )
                .reduce((a, v) => {
                  return v.rejected ? a + 1 : a;
                }, 0);
              const totalFinishedOrder = orders
                .filter((v) =>
                  startTime !== endTime
                    ? Date.parse(v.createdTime) > startTime &&
                      Date.parse(v.createdTime) < endTime
                    : true
                )
                .reduce((a, v) => {
                  return v.status ? a + 1 : a;
                }, 0);

              const result = [
                totalOrder,
                totalFinishedOrder,
                totalRejectedOrder,
              ];

              return {
                name: type,
                total: result[i],
              };
            })}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <div className="col-md-6">
        <LineChart
          width={600}
          height={550}
          data={orderType.map((type, i) => {
            const totalOrder = orders
              .filter((v) =>
                startTime !== endTime
                  ? Date.parse(v.createdTime) > startTime &&
                    Date.parse(v.createdTime) < endTime
                  : true
              )
              .reduce((a, v) => a + 1, 0);
            const totalRejectedOrder = orders
              .filter((v) =>
                startTime !== endTime
                  ? Date.parse(v.createdTime) > startTime &&
                    Date.parse(v.createdTime) < endTime
                  : true
              )
              .reduce((a, v) => {
                return v.rejected ? a + 1 : a;
              }, 0);
            const totalFinishedOrder = orders
              .filter((v) =>
                startTime !== endTime
                  ? Date.parse(v.createdTime) > startTime &&
                    Date.parse(v.createdTime) < endTime
                  : true
              )
              .reduce((a, v) => {
                return v.status ? a + 1 : a;
              }, 0);

            return {
              name: type,
              total:
                i === 0
                  ? totalOrder
                  : i === 1
                  ? totalFinishedOrder
                  : totalRejectedOrder,
            };
          })}
          className="m-auto my-2"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#d63031" />
        </LineChart>
      </div>
      <div className="col-md-4">
        <div className="mx-2 my-3">
          <i className="fa-solid fa-hourglass-start mx-2"></i>
          <input
            type="date"
            className="form-control my-3"
            name="startTime"
            onChange={(e) => {
              setStartTime(Date.parse(e.target.value));
            }}
          />

          <i className="fa-solid fa-hourglass-end mx-2"></i>
          <input
            type="date"
            className="form-control my-3"
            name="endTime"
            onChange={(e) => {
              setEndTime(Date.parse(e.target.value));
            }}
          />
        </div>

        <div className="mx-2 my-5">
          <hr />
          <p className="h6 text-danger d-flex">
            <i className="fa-solid fa-code mx-2"></i>
            {quote.content}
          </p>
          <p className="float-end footer text-info">{quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default StatRevenue;
