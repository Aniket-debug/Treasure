import { useNavigate } from "react-router-dom";
import "./index.css";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
const Header = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(AppContext)
  console.log(isAuthenticated)
  const navigate = useNavigate();
  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token")
  };
  const handleLogin = () => {
    navigate("/login");
  };
  console.log(isAuthenticated);
  return (
    <div className="Header">
      <span>Aniket's Game</span>
      <div className="Header__nav">
        <button onClick={() => navigate("/")}>Home</button>
        {isAuthenticated ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};
export default Header;
