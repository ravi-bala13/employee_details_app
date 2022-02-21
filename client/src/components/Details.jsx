import { Navbar } from "./Navbar";
import "../CSS/Details.css";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Details = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();

  const { token } = useSelector((state) => state);
  //   console.log("token:", token);

  useEffect(() => {
    getEmployees();
  }, []);

  const girl_img =
    "https://www.vhv.rs/dpng/d/426-4264903_user-avatar-png-picture-avatar-profile-dummy-transparent.png";
  const boy_img =
    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  //   console.log("id:", id);

  const getEmployees = () => {
    try {
      fetch(`http://localhost:2526/employee/${id}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log("data:", data);
          setDetails(data);
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (token == "") {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div id="screen_emp">
        <Navbar />
        <div className="blank1"></div>

        <div className="main_content">
          <div className="for_icon">
            <img
              className="user_profile"
              //   src="http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
              src={details.gender == "FeMale" ? girl_img : boy_img}
            />
          </div>

          <div className="user_sub_content">
            <div>NAME :</div>
            <div> {details.name}</div>
          </div>

          <div className="user_sub_content">
            <div>GENDER :</div>
            <div> {details.gender}</div>
          </div>

          <div className="user_sub_content">
            <div>AGE :</div>
            <div>{details.age}</div>
          </div>

          <div className="user_sub_content">
            <div>DEPARTMENT :</div>
            <div>{details.department}</div>
          </div>

          <div className="user_sub_content">
            <div>SALARY :</div>
            <div>{details.salary}</div>
          </div>
        </div>
        <div className="blank1"></div>
      </div>
    </div>
  );
};
