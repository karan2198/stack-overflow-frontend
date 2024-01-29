import React from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Questions = ({ slideIn, handleSlideIn,isDay }) => {
  console.log('isDay in Questions:' , isDay);
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay}/>
      <div className="home-container-2">
        <HomeMainbar isDay={isDay} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Questions;
