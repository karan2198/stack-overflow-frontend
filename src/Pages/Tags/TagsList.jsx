import React from "react";
import "./Tags.css";

const TagsList = ({ tag , isDay}) => {
  console.log('isDay in tagList:' , isDay);
  return (
    <div className={`tag ${isDay ? 'day' : 'night'}`}>
      <h5>{tag.tagName}</h5>
      <p className={` tagDes ${isDay ? 'day' : 'night'}`}>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;
