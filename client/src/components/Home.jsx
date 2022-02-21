import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/action";

import "../CSS/Home.css";
import { Navigate } from "react-router-dom";
import { saveData } from "../utils/sessionStorage";

export const Home = () => {
  const [login_set, setLogin_set] = useState("for_login1");
  const [signup_set, setSignup_set] = useState("for_signup2");

  const { token } = useSelector((state) => state);
  // console.log("token:", token);

  const dispatch = useDispatch();

  const [form_details, setForm_details] = useState({
    email: "",
    password: "",
  });

  const changetoLogin = () => {
    // alert("works");
    setLogin_set("for_login1");
    setSignup_set("for_signup2");
  };

  const changetoSignup = () => {
    setLogin_set("for_login2");
    setSignup_set("for_signup1");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm_details({ ...form_details, [name]: value });
  };

  const SubmitRegister = (e) => {
    e.preventDefault();
    // console.log("form_details:", form_details);

    try {
      fetch(`http://localhost:2526/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form_details),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log("res:", res);
          if (res.status) {
            alert(res.message);
          } else {
            alert("Registered successfully");
            changetoLogin();
          }
        });
    } catch (error) {
      console.log("error:", error);
    }

    setForm_details({
      email: "",
      password: "",
    });
  };

  const SubmitLogin = (e) => {
    e.preventDefault();
    // console.log("form_details:", form_details);

    try {
      fetch(`http://localhost:2526/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form_details),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log("res:", res);
          if (res.status) {
            alert(res.message);
          } else {
            // sessionStorage(res.token);
            saveData("token", res.token);
            dispatch(loginSuccess(res.token));
            alert("Login Successfully");
          }
        });
    } catch (error) {
      console.log("error:", error);
    }

    setForm_details({
      email: "",
      password: "",
    });
  };

  if (token.length > 10) {
    return <Navigate to={"/employee"}></Navigate>;
  }

  return (
    <div>
      <div id="screen">
        <div id="navbar_home">
          <div className="nav_content_home">
            <div>
              <button onClick={changetoLogin}>Login</button>
            </div>
            <div>
              <button onClick={changetoSignup}>Sign Up</button>
            </div>
          </div>
        </div>
        <div className="blank"> </div>
        <div id="homepage">
          <div className="contents">
            <div className={login_set}>
              <div>
                <h3 className="heading">LOGIN HERE</h3>
              </div>
              <div className="logging_in" onSubmit={SubmitLogin}>
                <form id="login_form">
                  <input
                    placeholder="Enter Email here to login"
                    id="login_mail"
                    name="email"
                    onChange={handleChange}
                    value={form_details.email}
                  ></input>

                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="login_password"
                    name="password"
                    value={form_details.password}
                    onChange={handleChange}
                  ></input>

                  <button>Submit</button>
                </form>
              </div>
            </div>

            <div className={signup_set}>
              <div>
                <h3 className="heading">SIGN-UP HERE</h3>
              </div>
              <div className="signing_up">
                <form id="signup_form" onSubmit={SubmitRegister}>
                  {/* <input placeholder="Enter Name" id="signup_name"></input> */}
                  <input
                    value={form_details.email}
                    placeholder="Enter Email"
                    id="signup_mail"
                    name="email"
                    onChange={handleChange}
                  ></input>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="sign_password"
                    name="password"
                    value={form_details.password}
                    onChange={handleChange}
                  ></input>

                  <button>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="blank"> </div>
      </div>
    </div>
  );
};
