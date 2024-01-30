import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import QuestionsDetails from "./QuestionsDetails";

const DisplayQuestion = ({ slideIn, handleSlideIn, isDay }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay} />
      <div className="home-container-2">
        <QuestionsDetails isDay={isDay}/>
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
