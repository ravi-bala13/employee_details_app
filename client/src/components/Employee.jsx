import { Navbar } from "./Navbar";
import "../CSS/Employee.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

export const Employee = () => {
  const [employee_details, setEmployee_details] = useState([]);
  //   console.log("employee_details:", employee_details);
  const [page, setPage] = useState(0);
  const [skip, setskip] = useState(0);
  const [page_limit, setPage_limit] = useState(0);

  const { token } = useSelector((state) => state);
  //   console.log("token:", token);

  useEffect(() => {
    getEmployees();
    handleSkip();
  }, [page]);

  const handleSkip = () => {
    let tem = page * 6;
    setskip(tem);
  };

  const getEmployees = () => {
    try {
      fetch(`http://localhost:2526/employee?page=${page}&size=6`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log("data:", data);
          setEmployee_details(data.employee);
          setPage_limit(data.totalPages);
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (token === "") {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div id="screen_emp">
        <Navbar />
        <div className="blank1"></div>

        <div className="inner_block">
          <div>
            <h2>EMPLOYEE DETAILS...</h2>
          </div>
          <div className="table">
            <div className="table_head">
              <div className="serial_num">SL.No</div>
              <div className="emp_name">Employee Name</div>
              <div className="depatment">Department</div>
              <div className="gender">Gender</div>
              <div className="emp_age">Age</div>
              <div className="emp_salary">Salary</div>
            </div>

            {/* The below "table content" should be made dynamic acoording to the data */}

            <div className="table_content">
              {employee_details.map((item, i) => (
                <Link to={`/details/${item._id}`} key={item._id}>
                  <div className="table_sub_content">
                    <div className="serial_num">{i + 1 + skip}</div>
                    <div className="emp_name"> {item.name} </div>
                    <div className="depatment"> {item.department} </div>
                    <div className="gender"> {item.gender} </div>
                    <div className="emp_age">{item.age}</div>
                    <div className="emp_salary"> {item.salary} </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* The below should be changed for pagination according to the datas */}
        <div className="pages_count">
          <button
            disabled={page === 0 ? true : false}
            onClick={() => setPage((prev) => prev - 1)}
          >
            {" "}
            {"<"}{" "}
          </button>
          <h5>.......</h5>
          <button
            disabled={page === page_limit ? true : false}
            onClick={() => setPage((prev) => prev + 1)}
          >
            {">"}
          </button>
        </div>

        <div className="blank1"></div>
      </div>
    </div>
  );
};
