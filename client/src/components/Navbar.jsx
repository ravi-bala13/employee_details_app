//import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import "../CSS/Navbar.css";
import { logoutSuccess } from "../Redux/action";
import { clearData } from "../utils/sessionStorage";

export const Navbar = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    clearData();
    dispatch(logoutSuccess());
  };

  return (
    <div>
      <div id="navbar">
        <div className="nav_content">
          <div className="search_input">
            <input placeholder="Search Here..."></input>
            <button id="inp_search">
              <img
                className="search_img"
                src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png"
              />
            </button>
          </div>
          <div>
            <button onClick={logOut}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};
