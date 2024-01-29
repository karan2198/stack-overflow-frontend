import React from "react";

import "./Users.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import UsersList from "./UsersList";

const Users = ({ slideIn, handleSlideIn , isDay}) => {
  console.log('isDay in Users:' , isDay);
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay} />
      <div className={`home-container-2 ${isDay? 'day' : 'night'}`}>
        <h1>Users</h1>
        <UsersList isDay={isDay}/>
      </div>
    </div>
  );
};

export default Users;
