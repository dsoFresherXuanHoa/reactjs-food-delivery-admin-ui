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

const StatCategory = () => {
  // Get Product List
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
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

  // Get Category List
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
          data={categories.map((c) => {
            const targetGoods = goods
              .filter((v) =>
                startTime !== endTime
                  ? Date.parse(v.CreatedAt) > startTime &&
                    Date.parse(v.CreatedAt) < endTime
                  : true
              )
              .filter((v) => v.category.ID === c.ID);
            const totalGoods = targetGoods.length;
            return {
              name: c.name,
              totalGoods: totalGoods,
            };
          })}
          className="m-auto my-2"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="totalGoods" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalGoods" stroke="#8884d8" />
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

export default StatCategory;
