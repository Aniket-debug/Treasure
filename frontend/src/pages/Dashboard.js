import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);
  const handleLogOut = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("admin_token");
    navigate("/admin")
  };
  if (isAdmin) {
    return (
      <div>
        <p> Welcome Admin, Dashboard</p>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    );
  }
  return(
    <div>You don't have permission to view this page</div>
  );
};

export default Dashboard;
