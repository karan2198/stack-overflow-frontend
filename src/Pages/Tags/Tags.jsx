import React from "react";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import TagsList from "./TagsList";
import "./Tags.css";
import { tagsList } from "./tagList";

const Tags = ({ slideIn, handleSlideIn , isDay}) => {
  console.log('isDay in tag:' , isDay);
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} isDay={isDay}/>
      <div className={`home-container-2 ${isDay ? 'day' : 'night'}`}>
        <h1 className={`tags-h1 ${isDay ? 'day' : 'night'}`}>Tags</h1>
        <p className={`tags-p ${isDay ? 'day' : 'night'}`}>
          A tag is a keyword or label that categorizes your question with other,
          similar questions.
        </p>
        <p className={`tags-p ${isDay ? 'day' : 'night'}`}>
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className={`tags-list-container`}>
          {tagsList.map((tag, index) => (
            <TagsList tag={tag} key={index} isDay={isDay}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
