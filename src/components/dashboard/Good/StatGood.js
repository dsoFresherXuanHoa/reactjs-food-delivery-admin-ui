import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatGood = () => {
  // Get Product List
  const [goods, setGoods] = useState([]);
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/products/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setGoods(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Random Quote:
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
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
  return (
    <div
      className="container-fluid row border rounded m-2"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-8">
        <LineChart
          width={900}
          height={550}
          data={goods
            ?.filter((v) =>
              startTime !== endTime
                ? Date.parse(v.CreatedAt) > startTime &&
                  Date.parse(v.CreatedAt) < endTime
                : true
            )
            ?.map((v) => ({
              name: v.name,
              price: v.price / 1000,
              reorderLevel: v.reorderLevel,
              stockAmount: v.stockAmount,
              discountPercent: v.discount.discountPercent,
            }))}
          className="m-auto my-2"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="stockAmount" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <Line type="monotone" dataKey="reorderLevel" stroke="#d63031" />
          <Line type="monotone" dataKey="stockAmount" stroke="#0984e3" />
          <Line type="monotone" dataKey="discountPercent" stroke="#e84393" />
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

export default StatGood;
