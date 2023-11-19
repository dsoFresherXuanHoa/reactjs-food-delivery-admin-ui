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

const StatEmployee = () => {
  // Get Employee List
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/employees/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <div
      className="container-fluid row border rounded m-2"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-8">
        <LineChart
          width={900}
          height={550}
          data={employees.map((e) => {
            const totalOrder = orders
              .filter((v) =>
                startTime !== endTime
                  ? Date.parse(v.createdTime) > startTime &&
                    Date.parse(v.createdTime) < endTime
                  : true
              )
              .reduce((a, v) => (v.table.employee.ID === e.ID ? a + 1 : a), 0);

            return {
              name: e.fullName,
              totalOrder: totalOrder,
            };
          })}
          className="m-auto my-2"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="totalOrder" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalOrder" stroke="#d63031" />
        </LineChart>
      </div>
      <div className="col-md-4">
        <div className="mx-2 my-3">
          <i className="fa-solid fa-hourglass-start mx-2"> Start Time: </i>
          <input
            type="date"
            className="form-control my-3"
            name="startTime"
            onChange={(e) => {
              setStartTime(Date.parse(e.target.value));
            }}
          />

          <i className="fa-solid fa-hourglass-end mx-2"> End Time: </i>
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

export default StatEmployee;
